const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://localhost:27017/testOliveDB`);

const groupModel = require("../modelGroup");
const userModel = require("../modelUser");
const userACL = require("../modelACL");
const hashModel = require("../modelHash");
const settingsModel =require("../modelSettings");
const util = require("util");
const log = console.log;

userModel.find()
    .populate("settings hash")
    .populate({
        path: 'acl',
        model: 'ACL',
        populate: {
            path: 'permissions.entity',
            model: 'Group'
        }
    })
    .exec()
    .then(function(data){
         //log(util.inspect(data[0].acl[0].permissions[0].actions,5,4));
        //log(util.inspect(data[0].acl[0].permissions[0].entity));
        log(util.inspect(data[0].acl[0].permissions,{depth:5}));
        //log(util.inspect(data,{depth:6}));
        mongoose.disconnect();
    });

// userACL.findOne()
//     .populate({
//         path: 'permissions.entity',
//         model: 'Group'
//     })
//     .exec()
//     .then((data,err)=>{
//         //console.log("DATA:::",util.inspect(data,{depth:5}));
//         console.log("Entity:::",util.inspect(data.permissions[0].entity,{depth:5}));
//         mongoose.disconnect();
//     });


