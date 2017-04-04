import chatTemplate from './chat.component.tpl.html';
import { ChatController } from './chat.controller';

class ChatComponent {
	constructor() {
		this.template = chatTemplate;
		this.controller = ChatController;
	}
}

export { ChatComponent };