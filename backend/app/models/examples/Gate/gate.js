let Gate = require('../../.././Gate');
var res =[
    {
        actions: [ 'read', 'write' ],
        _id: "58af31f0c02e80117412eeb7",
        entity: {
            groupUsers: [],
            groupMessages: [],
            meta: {
                maxUsers: 12,
                groupTag: '@lastGroup',
                groupName: 'First group'
            }
        }
    }
];

let gate = new Gate(res,"@lastGroupl");
gate.read;
gate.write;
gate.ban;
console.log(gate.isAllowed());
console.log(gate.failed);