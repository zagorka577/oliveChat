var groupModel = require('../../app/models/modelGroup');
var userModel = require('../../app/models/modelUser');

module.exports = {
    getGroupMembersById: getGroupMembersById
};

function getGroupMembersById (request, response) {
    var groupId = request.swagger.params.groupId.value;
    groupModel.findById(groupId)
              .populate('groupUsers')
              .populate({
                  path: 'groupUsers',
                  populate: {
                    path: 'acl',
                    populate: {
                        path: 'permissions.entity',
                    },
                  }
              })
              .populate({
                  path: 'groupUsers',
                  populate: {
                    path: 'settings',
                  }
              })
              .exec()
              .then(group => {
                  response.json(group.groupUsers);
              })
              .catch(error => {
                  response.json(error)
              });
}

