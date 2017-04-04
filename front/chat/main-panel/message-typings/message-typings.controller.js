class MessageTypingsController {
	constructor(MessageSocketService) {
		this.messageSocketService = MessageSocketService;
	}
}

MessageTypingsController.$inject = ['MessageSocketService'];

export { MessageTypingsController };