import messageContainerTemplate from './message-container.tpl.html';

class MessageContainerComponent {
    constructor() {
		this.template = messageContainerTemplate;
		this.bindings = {
    		message: '<'
  		}
    }
};

export {MessageContainerComponent};