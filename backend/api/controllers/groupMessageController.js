'use strict';

module.exports = {
  getAllGroupMessages: getAllGroupMessages,
}

var groupModel = require('../../app/models/modelGroup');

function getAllGroupMessages(request, response, next) {
    var groupId = request.swagger.params.groupId.value;
    groupModel.findById(groupId)
              .populate('groupMessages')
              .exec()
              .then(group => {
                  response.json(group.groupMessages);
              })
              .catch(error => {
                  response.json(error)
              });
}