'use strict';

var util = require('util');
var request = require('request');
var messageModel = require('../../app/models/modelMessage');
var groupModel = require('../../app/models/modelGroup');
var userModel = require('../../app/models/modelUser');
var userACL = require('../../app/models/modelACL');
var Gate = require('../../app/guard/Gate');

var dataBase = require('./mockDataBase');

var groupList = dataBase.groupList;
var messageList = dataBase.messageList;

module.exports = {
	getAllMessages: getAllMessages,
	createMessage: createMessage,
	getMessageById: getMessageById,
	updateMessage: updateMessage,
	deleteMessage: deleteMessage
}

function getAllMessages (request, response, next) {
	messageModel.find()
			 .exec()
			 .then(allMessages => {
				response.json(allMessages);
			 })
			 .catch(error => {
					response.json(error);
				});
}

function getMessageById (request, response, next) {
	var messageId = request.swagger.params.id.value;
	messageModel.findById(messageId)
				.exec()
				.then(message => {
					response.json(message);
				})
				.catch(error => {
					response.json(error);
				});
}

function createMessage (request, response, next) {
	var userMessage = request.swagger.params.userMessage.value;
	userModel.findById(userMessage.authorId)
			 .populate('acl')
			 .populate({
				path: 'acl',
				populate: {
					path: 'permissions.entity',
				},
			 })
			 .exec()
			 .then(author => {
				groupModel
					.findById(userMessage.groupId)
					.exec()
					.then(group => {
						let gate = new Gate(author.acl.permissions, group.meta.groupTag);
						gate.write;

						if (gate.isAllowed()) {
							let newMessage = new messageModel ({
								authorId: author._id,
								author: author.name,
								messageBody: userMessage.messageBody,
								groupId: group._id,
							});
							newMessage.messageTime = userMessage.messageTime || Date()

							newMessage.save()
								.catch(error => {
									response.json(error);
								});

							group.groupMessages.push(newMessage);
							group.save()
								 .catch(error => {
									 response.json(error);
								 });

							response.json({
								id: newMessage._id,
								authorId: newMessage.authorId,
								author: newMessage.author,
								groupId: newMessage.groupId,
								messageTime: newMessage.messageTime,
								messageBody: newMessage.messageBody,
							});
						};
					})
					.catch(error => {
						response.json(error);
					});
			 })
			.catch(error => {
				response.json(error);
			});
}

function updateMessage (request, response, next) {
	var messageId = request.swagger.params.id.value;
	var newMessageData = request.swagger.params.userMessage.value;
	messageModel.findById(messageId)
				.populate('groupId')
				.exec()
				.then(message => {
					userModel.findById(message.author)
							 .populate('acl')
							 .populate({
								path: 'acl',
								populate: {
									path: 'permissions.entity',
								},
							 })
							 .exec()
							 .then(author => {
								groupModel
									.findById(message.groupId)
									.exec()
									.then(group => {
										let gate = new Gate(author.acl.permissions, group.meta.groupTag);
										gate.write;
										if (gate.isAllowed()) {
											Object.assign(message, newMessageData);
											message.save()
													.catch(error => {
														response.json(error);
													});
											response.json({
												id: newMessage._id,
												authorId: newMessage.authorId,
												author: newMessage.author,
												groupId: newMessage.groupId,
												messageTime: newMessage.messageTime,
												messageBody: newMessage.messageBody,
											});
										}
									});
							 });
				});
}

function deleteMessage (request, response, next) {
	var messageId = request.swagger.params.id.value;
	messageModel.findById(messageId)
				.populate('groupId')
				.exec()
				.then(message => {
					var groupMessageList = message.groupId.groupMessages;
					var messageIndex = groupMessageList.indexOf(messageId);
					groupMessageList.splice(messageIndex, 1);
					message.groupId.save()
								.catch(error => response.json(error));
					message.remove()
						   .then(message => { 
							   response.json({
								   id: newMessage._id,
								   authorId: newMessage.authorId,
								   author: newMessage.author,
								   groupId: newMessage.groupId,
								   messageTime: newMessage.messageTime,
								   messageBody: newMessage.messageBody,
							  })
							})
						   .catch(error => response.json(error));
				})
				.catch(error => response.json(error));
}