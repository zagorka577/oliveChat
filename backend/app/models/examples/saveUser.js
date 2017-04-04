const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://localhost:27017/olivka-social-auth`);

const groupModel = require("../modelGroup");
const userModel = require("../modelUser");
const userACL = require("../modelACL");
const hashModel = require("../modelHash");
const settingsModel =require("../modelSettings");
const groupGeneral = new groupModel({
    meta:{
        groupName:"First group",
        maxUsers:12,
        groupTag:"@lastGroup"
    }
});
groupGeneral.save((err,group)=>{
    err?console.log("Group Error:::",err):console.log("Saved group with id:: ",group._id);
    let hash = new hashModel({
        hashVal:"password"
    });
    hash.save((err,hash)=>{
        err?console.log("Hash Error:::",err):console.log("Saved hash with id:: ",hash._id);
        var settings=new settingsModel({});
        settings.save((err,settings)=>{
            err?console.log("Settings Error:::",err):console.log("Saved settings with id:: ",settings._id);
            var user =  new userModel({
                name:"Igor",
                email:"mfc2005@ukr.net",
                meta:{
                    age:34
                },
                hash:hash,
                settings:settings
            });
            user.save((err,user)=>{
                err?console.log("User Error:::",err):console.log("Saved User with id:: ",user._id);
                var igorACL = new userACL({
                    permissions:[{
                        entity:group,
                        actions:["read","write"]
                    }]
                });
                igorACL.save((err,acl)=>{
                    err?console.log("ACL Error:::",err):console.log("Saved acl with id:: ",acl._id);
                    user.update({acl:igorACL},(err,raw)=>{
                        err?console.log("User Error:::",err):console.log("Saved with data:: ",raw);
                    });
                });
                group.groupUsers.push(user._id);
                group.save();
            });
        });
    });
});