const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://localhost:27017/testOliveDB`);

let hashModel = require("../modelHash");

// let hash  = new hashModel({
//     hashVal:"secret_password"
// });
//
// hash.save((err, data)=>{
//     mongoose.disconnect(); // ID: 58a9fbda02244810b4adac3d
// });


hashModel
    .findOne({_id:"58aadd82ed03d70570296191"},function(err,data){
        data.validateHash('secret_password123', function(err, validationResult) {
            if (err) throw err;
            console.log('Verification Result:::', validationResult);
            mongoose.disconnect();
        });
    });
