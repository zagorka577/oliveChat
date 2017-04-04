import sideBarTemplate from './side-bar.component.tpl.html';
import { SideBarController } from './side-bar.controller';


class SideBarComponent {
	constructor() {
		this.template = sideBarTemplate;
		this.controller = SideBarController;
	}
}

export { SideBarComponent };