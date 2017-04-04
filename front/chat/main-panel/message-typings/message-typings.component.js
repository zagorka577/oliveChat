import messageTypingsTemplate from './message-typings.component.html';
import { MessageTypingsController } from './message-typings.controller';

class MessageTypingsComponent {
	constructor() {
		this.template = messageTypingsTemplate;
		this.controller = MessageTypingsController;
	}
}


export { MessageTypingsComponent };