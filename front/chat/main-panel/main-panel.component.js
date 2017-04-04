import mainPanelTeplate from './main-panel.component.tpl.html';
import { mainPanelController } from './main-panel.controller';

class MainPanelComponent {
	constructor() {
		this.template = mainPanelTeplate;
		this.controller = mainPanelController;
		this.bindings = {
			toggleSideBar: '&'
		};
	}
}

export { MainPanelComponent };