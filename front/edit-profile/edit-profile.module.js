import { EditProfileComponent } from './edit-profile.component';
import { uploadPhoto } from './upload-photo/upload-photo.component';// import ngFileUpload from 'ng-file-upload';

const editProfileModule = angular.module('app.editProfile', [])
    .component('editProfile', new EditProfileComponent())
    .component('uploadPhoto', new uploadPhoto())
    .name;

export { editProfileModule };
 