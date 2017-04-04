import editProfileTemplate from './edit-profile.component.tpl.html';
import { EditProfileController } from './edit-profile.controller';
 
class EditProfileComponent {
    constructor () {
        this.template = editProfileTemplate;
        this.controller = EditProfileController;
    }
}

export { EditProfileComponent };
