'use strict'
const userModel = require('./../../app/models/modelUser');
const settingsModel = require('./../../app/models/modelSettings');
const hashModel = require('./../../app/models/modelHash');
const ACLModel = require('./../../app/models/modelACL');
const groupModel = require('./../../app/models/modelGroup');

const jwt = require('./../../app/guard/JWTGuard');

module.exports = {
  getAllUsers: getAllUsers,
  getUsersById: getUsersById,
  storeUser: storeUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}

var dataBase = require('./mockDataBase');

var userList = dataBase.userList;

function getAllUsers (req, res, next) {
    let friendsList = [];
    friendsList = getAllFriends('58e3a5b0a355fd1db0891f69');
    console.log('friends list', friendsList);
    userModel.find()
             .populate('settings')
             .exec()
             .then(userList => {
                 res.send(userList);
             });
}

function getUsersById (req, res, next) {
    let userId = req.swagger.params.id.value;

    userModel.findById(userId)
             .populate('settings')
             .populate({
                 path: 'acl',
                 populate: {
                     path: 'permissions.entity',
                 },
             })
             .exec()
             .then(userData => {
                res.json(userData);
             });
}

function storeUser (req, res, next) {
    let userData = req.swagger.params.userData.value;
    userModel.findOne({name: userData.name})
             .exec()
             .then(userData => {
                let response = {nameUsed: userData.name};
                res.json(response);
             });
    userModel.findOne({email: userData.email})
             .exec()
             .then(userData => {
                let response = {emailUsed: userData.email};
                res.json(response);
             });
    const group = new groupModel({
        meta: {
            groupName: userData.name,
            maxUsers: 2,
            groupTag: 'Tag',
        }
    });

    group.save().then(group => {
        const hash = new hashModel({
            hashVal: userData.password
        });

        hash.save().then(hash => {
            const settings = new settingsModel();

            settings.save().then(settings => {
                const ACL = new ACLModel({
                    permissions: [
                        {
                            entity: group,
                            actions: ["read","write"]
                        }
                    ]
                });

                ACL.save().then(ACL => {
                    const user = new userModel({
                        name: userData.name,
                        email: userData.email,
                        hash: hash,
                        settings: settings,
                        acl: ACL
                    });

                    user.save().then(user => {
                        group.groupUsers.push(user._id);
                        group.author = user._id;
                        group.meta.groupTag = group.meta.groupTag + group._id;
                        group.meta.description = user.name + '`s forever alone dialog';
                        group.save().then(() => {
                            res.json(user);
                        });
                    });
                });
            });
        });
    });
}

function updateUser (req, res, next) {
    const userId = req.swagger.params.id.value;
    const updateUserData = req.swagger.params.userData.value;
    
    if(updateUserData.password) {
        updatePassword(userId, updateUserData.password);
        delete updateUserData.password;
    }
    
    if(updateUserData.settings) {
        updateSettings(userId, updateUserData.settings);
        delete updateUserData.settings;
    }

    if((updateUserData.actions) && (updateUserData.actions)){
        updateACL(userId, updateUserData.entityId, updateUserData.actions);
        delete updateUserData.entityId;
        delete updateUserData.actions
    }
    //TODO Provide logic for password settings and acl update
    userModel.findById(userId)
             .exec()
             .then(userData => {
                Object.assign(userData, updateUserData);
                userData.save((error, updatedUser) => {
                    if (error) 
                        console.log(error);
                    res.json(updatedUser);
                });
             });
}

function deleteUser (req, res, next) {
    var userId = req.swagger.params.id.value;
    //TODO provide remove
    userModel.findByIdAndRemove(userId);
}

function updatePassword (userId, updatedPass) {
    userModel.findById(userId)
             .exec()
             .then(userData => {
               hashModel.findById(userData.hash)
                        .exec()
                        .then(updatedHash => {
                            updatedHash.hashVal = updatedPass;
                            updatedHash.save()
                                       .then(updatedHash => {
                                            console.log('hash after', updatedHash.hashVal)
                                       });
                        });
                
             });

}

function updateSettings(userId, updateSettings) {
    userModel.findById(userId)
             .exec()
             .then(userData => {
                settingsModel.findById(userData.settings)
                             .exec()
                             .then(userSettings => {
                                Object.assign(userSettings.meta, updateSettings);
                                userSettings.save()
                                            .then(updatedUserSettings => {
                                                console.log('settings after', updatedUserSettings);
                                            });
                             });
             });
}

function updateACL(userId, entityId, updateACL) {
    userModel.findById(userId)
             .exec()
             .then(userData => {
                ACLModel.findById(userData.acl)
                        .exec()
                        .then(userACL => {
                            let index;
                            userACL.permissions.forEach(element => {
                                if (element.entity == entityId) {
                                    index = userACL.permissions.indexOf(element);
                                }
                            });
                            userACL.permissions[index].actions = updateACL;
                            userACL.save()
                                   .then(updatedActions => {
                                        console.log('updated ACL', updatedActions.permissions);
                                   });
                        });
             });
}

function getAllFriends(userId) {
    let friendsList = [];
    userModel.findById(userId)
             .populate('acl')
            //  .exec()
            //  .then(user => {
                    // ACLModel.findById(user.acl)
                .exec()
                .then(user => {
                    user.acl.permissions.map(element => {
                        groupModel.findById(element.entity)
                                    .exec()
                                    .then(currentGroup => {
                                        if (currentGroup.groupUsers.length == 2) {
                                            currentGroup.groupUsers.map( userInGroupId => {
                                                if (userId != userInGroupId) {
                                                    userModel.findById(userInGroupId)
                                                             .exec()
                                                             .then(friend => {
                                                                friendsList.push(friend);
                                                                console.log('frinds list inside friends', friendsList)
                                                                return friendsList;
                                                             });
                                                }
                                            });
                                        }
                                    });
                    })
                })
                .then( () => {
                        console.log('friend list inside length', friendsList.length);
                })
                .catch(error => {
                    console.log(error);
                });
            //  });
}
