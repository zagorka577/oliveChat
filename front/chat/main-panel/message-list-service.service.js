class MessageListService {
	constructor(GroupMessageRepository,
				MessageRepository,
				MessageSocketService,
				LoginUserStorageService) {
		
		this.groupMessageRepository = GroupMessageRepository;
		this.messageRepository = MessageRepository;
		this.messageSocketService = MessageSocketService;
		this.loginUserStorageService = LoginUserStorageService;
		this._groupId;
		this._messageList = [];

		this.initHandlersSubscribers();
	}

	markIterativeMessagesBySameUser(data) {
		data.forEach((element, i, arr) => {
			if (arr[i]['author'] === arr[i + 1]['author']) {
				arr[i + 1]['iterative'] = true;
			} else {
				arr[i + 1]['iterative'] = false;
			}
		});
	}

	markNewMessageBySameUser(data, newMessage) {
		if (data && data.length && data[data.length - 1]['author'] === newMessage['author']) {
			newMessage['iterative'] = true;
		} else {
			newMessage['iterative'] = false;
		}
	}

	initHandlersSubscribers() {
		this.messageSocketService.connectHandler
			.subscribe(data => {
				this.messageSocketService.joinRoom(this._groupId);
			});

		this.messageSocketService.sendMessageHandler
			.subscribe(data => {
				this._messageList.push(data);
			});
	}

	joinChatGroup(groupId) {
		if(this._groupId !== groupId) {
			this.messageSocketService.leaveRoom(this._groupId);
			this._groupId = groupId;
			this.messageSocketService.joinRoom(this._groupId);
			
			this.groupMessageRepository.getAllMessagesByGroupId(this._groupId)
					.then(res => this._messageList = res);
		}
	}

	get groupMessageList() {
		return this._messageList;
	}

	get activeGroupId() {
		return this._groupId;
	}

	createMessage(messageData) {
		return this.messageRepository.createMessage(messageData);
	}

	sendMessage($event, messageBody) {
		let messageData = {
			groupId: this._groupId,
			messageBody: messageBody,
			messageTime: Date(),
		};

		this.loginUserStorageService.loginUser.then(user => {
			messageData.authorId = user.id;
			messageData.author = user.name;

			this.createMessage(messageData)
				.then(response => {
					this.messageSocketService.sendMessage(messageData);

					// this.markNewMessageBySameUser(this._messageList, messageData);
					this._messageList.push(messageData);
				});
		});



		$event.target.value = '';
	}
}

MessageListService.$inject = [
							  'GroupMessageRepository',
							  'MessageRepository',
							  'MessageSocketService',
							  'LoginUserStorageService'
							 ];
							 
export { MessageListService };