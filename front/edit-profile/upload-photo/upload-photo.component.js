import uploadPhotoTemplate from './upload-photo-template.html';
import { uploadPhotoController } from './upload-photo.controller';

class uploadPhoto {
    constructor () {
        this.template = uploadPhotoTemplate;
        this.controller = uploadPhotoController;
        this.bindings = {
            'userId': '@'
        };
    }
};

export { uploadPhoto };
