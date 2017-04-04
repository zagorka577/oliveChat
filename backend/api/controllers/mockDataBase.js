let groupList = [
	{
		id: 0,
		name: 'Brothers',
		members: [4,8,6,5]
	},
	{
		id: 1,
		name: 'Friiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiends',
		members: [1,2,3]
	},
	{
		id: 2,
		name: 'Sisters',
		members: [7,8,9,2,5]
	},
	{
		id: 3,
		name: 'Neighborhoods',
		members: [1,5,3]
	},
	{
		id: 4,
		name: 'Classmates',
		members: [4,5,9,8]
	},
	{
		id: 5,
		name: 'Homeless',
		members: [4,5,3,9,7]
	},
	{
		id: 6,
		name: 'Strangers',
		members: [6,9,8,3,4,7]
	},
	{
		id: 7,
		name: 'Gods',
		members: [1,4,5,6,7]
	},
	{
		id: 8,
		name: 'Devils',
		members: [5,7,9]
	},
	{
		id: 9,
		name: 'Femen',
		members: [4,5,6,7]
	},
	{
		id: 10,
		name: 'Test',
		members: [0,1]
	},
];

let userList = [
	{
		id: 0,
		name: 'Homeless',
		email: 'Homeless email',
		password: 'Homeless password',
		metadata: {
			age: 25
		},
		groupsId: [],
	},
	{
		id: 1,
		name: 'Grisha',
		email: 'Grisha email',
		password: 'Grisha password',
		metadata: {
			age: 21
		},
		groupsId: [1, 3, 7],
	},
	{
		id: 2,
		name: 'Fedya',
		email: 'Fedya email',
		password: 'Fedya password',
		metadata: {
			age: 42
		},
		groupsId: [1, 2],
	},
	{
		id: 3,
		name: 'Anastasia',
		email: 'Anastasia email',
		password: 'Anastasia password',
		metadata: {
			age: 24
		},
		groupsId: [1, 3, 5, 6],
	},
	{
		id: 4,
		name: 'Frank',
		email: 'Frank email',
		password: 'Frank password',
		metadata: {
			age: 35
		},
		groupsId: [0, 4, 5, 6, 7],
	},
	{
		id: 5,
		name: 'Viktor',
		email: 'Viktor email',
		password: 'Viktor password',
		metadata: {
			age: 54
		},
		groupsId: [0, 4, 5, 6, 7],
	},
	{
		id: 6,
		name: 'Mick Jagger',
		email: 'Mick Jagger email',
		password: 'Mick Jagger password',
		metadata: {
			age: 87
		},
		groupsId: [0, 6, 7, 9],
	},
	{
		id: 7,
		name: 'Ronaldinho',
		email: 'Ronaldinho email',
		password: 'Ronaldinho password',
		metadata: {
			age: 10
		},
		groupsId: [2, 5, 6, 7, 8, 9],
	},
	{
		id: 8,
		name: 'Abraham',
		email: 'Abraham email',
		password: 'Abraham password',
		metadata: {
			age: 28
		},
		groupsId: [0, 2, 4, 6],
	},
	{
		id: 9,
		name: 'Magister Yoda',
		email: 'Magister Yoda email',
		password: 'Magister Yoda password',
		metadata: {
			age: 26
		},
		groupsId: [2, 4, 5, 6, 8],
	},
	{
		id: 10,
		name: 'Dart Weider',
		email: 'Dart Weider email',
		password: 'Dart Weider password',
		metadata: {
			age: 38
		},
	},
];

let messageList = [
		{
		id: 0,
		groupId: 10,
		author: "Vlad",
		messageBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali"
	},
		{
		id: 1,
		groupId: 1,
		author: "Vlad",
		messageBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali"
	},
	{
		id: 2,
		groupId: 10,
		author: "Bogdan",
		messageBody: "Hi, everyone"
	},
	{
		id: 3,
		groupId: 1,
		author: "Natali",
		messageBody: "Hello"
	},
	{
		id: 4,
		groupId: 2,
		author: "Vlad",
		messageBody: "What's up?"
	},
	{
		id: 5,
		groupId: 2,
		author: "Bogdan",
		messageBody: "Great! Watched yesterday match?"
	},
	{
		id: 6,
		groupId: 2,
		author: "Natali",
		messageBody: "Your football, again..."
	},
	{
		id: 7,
		groupId: 3,
		author: "Vlad",
		messageBody: "Mesut Ozil was amazing... such dribling and passing skills!"
	},
	{
		id: 8,
		groupId: 3,
		author: "Natali",
		messageBody: "Stop!!! Please"
	},
	{
		id: 9,
		groupId: 4,
		author: "Bogdan",
		messageBody: "Chealsea played awfull, why Hazard was sitting on bench?"
	},
	{
		id: 10,
		groupId: 4,
		author: "Vlad",
		messageBody: "Heard that Messi is coming to Arsenal?"
	},
	{
		id: 11,
		groupId: 4,
		author: "Bogdan",
		messageBody: "great...((( What Barca will do without him?"
	},
	{
		id: 12,
		groupId: 5,
		author: "Natali",
		messageBody: "It realy annoying, bye)"
	},
	{
		id: 13,
		groupId: 5,
		author: "Vlad",
		messageBody: "Bye"
	},
	{
		id: 14,
		groupId: 6,
		author: "Bogdan",
		messageBody: "see you in university"
	},
	{
		id: 15,
		groupId: 6,
		author: "Natali",
		messageBody: "I ll be there at 14 00"
	},
	{
		id: 16,
		groupId: 6,
		author: "Bogdan",
		messageBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali"		
	},
];

module.exports = {
	groupList: groupList,
	userList: userList,
	messageList: messageList,
}