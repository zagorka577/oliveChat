var util = require('util');
var request = require('request');
var dataBase = require('./mockDataBase');

const mongoose = require('mongoose');

var groupModel = require('../../app/models/modelGroup');
var userModel = require('../../app/models/modelUser');

module.exports = {
	getAllGroups: getAllGroups,
	getGroupById: getGroupById,
	createGroup: createGroup,
	updateGroupById: updateGroupById,
	deleteGroupById: deleteGroupById
};

function getAllGroups (request, response, next) {
	groupModel.find()
			  .exec()
			  .then(allGroups => {
				  response.json(allGroups);
			  })
			  .catch(error => {
				  response.json(error);
			  });
}

function getGroupById (request, response, next) {
	var groupId = request.swagger.params.id.value;
	groupModel.findById(groupId)
			  .then(group => {
				  response.json(group)
			  })
			  .catch(error => {
				  response.json(error);
			  })
}

function createGroup (request, response, next) {
	var newGroupData = request.swagger.params.newGroup.value;

		let newGroup = new groupModel({
			author: newGroupData.authorId,
			groupUsers: [newGroupData.authorId],
			groupMessages: [],
		});
		
		if(newGroupData.meta) {
			newGroup.meta = {
				groupName: newGroupData.meta.groupName || '',
				description: newGroupData.meta.description || '',
				created_at: newGroupData.meta.createdAt || Date(),
			}
		}

		newGroup.meta.groupTag = 'Tag' + newGroup._id;
		if(Array.isArray(newGroupData.groupUsers)) {
			newGroup.meta.maxUsers = newGroupData.groupUsers.length <= 2 ? 2 : 16;
			newGroup.groupUsers = newGroup.groupUsers.concat(newGroupData.groupUsers);
		};

		newGroup.groupUsers.map(member => {
			addPermissions(newGroup._id, member, ['read', 'write']);
		});

		newGroup.save()
				.then(newGroup => response.json(newGroup))
				.catch(error => response.json(error));
}

function updateGroupById (request, response, next) {
	var groupId = request.swagger.params.id.value;
	var updateGroupData = request.swagger.params.body.value;

	groupModel.findById(groupId)
			  .exec()
			  .then(group => {
				  if(updateGroupData.meta) {
					group.meta.groupName = updateGroupData.meta.groupName || group.meta.groupName;
					group.meta.description = updateGroupData.meta.description || group.meta.description;
					group.meta.updated_at = updateGroupData.meta.updatedAt || Date();
				  }

				  updateGroupMembers(group, updateGroupData, ['read', 'write']);
				  group.author = updateGroupData.authorId || group.author;

				  group.save()
				  	   .then(group => response.json(group))
				  	   .catch(error => response.json(error));
			  })
			  .catch(error => response.json(error));
}

function updateGroupMembers(group, updateGroupData, permissions) {
	var alreadyExistMember = '',
		indexOfGroupMember,
		authorIndex;
		if(updateGroupData.authorId) {
			group.author = updateGroupData.authorId;
			if(group.groupUsers.indexOf(group.author) == -1) {
				group.groupUsers.push(updateGroupData.authorId);
			}

			addPermissions(group._id, group.author, permissions);
		}
	if(Array.isArray(updateGroupData.groupUsers)) {
		updateGroupData.groupUsers.map(member => {
			indexOfGroupMember = group.groupUsers.indexOf(member);

			if(indexOfGroupMember != -1 && !group.author.equals(member)) {
				group.groupUsers.splice(indexOfGroupMember, 1);
				deleteAllPrmissions(group._id, member);
			}

			if (indexOfGroupMember == -1 && !updateGroupData.author) {
				group.groupUsers.push(member);
				addPermissions(group._id, member, permissions);
			}
		});

	return group.groupUsers;
	}
}

function deleteGroupById (request, response, next) {
	var groupId = request.swagger.params.id.value;
	groupModel.findById(groupId)
			  .exec()
			  .then(group => {
				  group.groupUsers.map(member => {
					  deleteAllPrmissions(groupId, member);
				  });
				  group.remove()
				  	   .then(group => {
							response.json(group);
					   })
					   .catch(error => {
						   response.json(error);
					   });
			  });
}

function addPermissions(groupId, member, permissions) {
	var isAlredyHavePermission = false;
	userModel.findById(member)
				.populate('acl')
				.exec()
				.then(user => {
					user.acl.permissions.map(permission => {
						if(groupId.equals(permission.entity)) {
							isAlredyHavePermission = true;
						}
					});
					if(!isAlredyHavePermission){
						user.acl.permissions.push({
							entity: groupId,
							actions: permissions,
							_id: mongoose.Types.ObjectId(),
						});
					}
					user.acl.save();
				})
}

function deleteAllPrmissions(groupId, member) {
	userModel.findById(member)
				.populate('acl')
				.exec()
				.then(user => {
					user.acl.permissions.map((permission, index) => {
						if (permission.entity.equals(groupId)) {
							user.acl.permissions.splice(index, 1);
						} 
					});
					user.acl.save();
				});
}