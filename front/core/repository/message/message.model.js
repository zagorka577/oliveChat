/**
 * Message model
 */
export class MessageModel {
	/**
	 * Initializes model
	 */
	constructor(message) {
		this.id = message.id;
		this.authorId = message.authorId;
		this.author = message.author;
		this.groupId = message.groupId;
		this.messageBody = message.messageBody;
		this.messageTime = message.messageTime;
	}
}