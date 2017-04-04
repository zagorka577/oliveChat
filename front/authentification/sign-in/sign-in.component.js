import signInTemplate from './sign-in.component.tpl.html';
import { SignInController } from './sign-in.controller';

class SignInComponent {
	constructor() {
		this.template = signInTemplate;
		this.controller = SignInController;
	}
}

export { SignInComponent };
