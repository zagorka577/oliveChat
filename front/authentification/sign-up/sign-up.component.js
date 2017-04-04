import signUpTemplate from './sign-up.component.tpl.html';
import { SignUpController } from './sign-up.controller';

class SignUpComponent {
	constructor() {
		this.template = signUpTemplate;
		this.controller = SignUpController;
	}
}

export { SignUpComponent };
