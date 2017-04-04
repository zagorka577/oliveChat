import addGroupTemplate from './add-group.component.tpl.html';
import { AddGroupController } from './add-group.controller';

class AddGroupComponent {
	constructor() {
		this.template = addGroupTemplate;
		this.controller = AddGroupController;
	}
}

export { AddGroupComponent };