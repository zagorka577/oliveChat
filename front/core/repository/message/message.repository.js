import { MESSAGE_REPO_CONFIG } from '../repository.config';
import { AbstractRepository } from '../abstract.repository';
import { MessageModel } from './message.model';

class MessageRepository extends AbstractRepository {
	constructor($http) {
		super($http, MESSAGE_REPO_CONFIG, MessageModel);
	}

	getMessage(messageId) {
		return this.getItem(messageId);
	}

	getAllMessages() {
		return this.getAll();
	}

	createMessage(message) {
		return this.createItem(message);
	}

	updateMessage(messageId, message) {
		return this.updateItem(messageId, message);
	}

	deleteMessage(message) {
		return this.deleteItem(message.id);
	}
}

export { MessageRepository };