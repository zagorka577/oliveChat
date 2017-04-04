class uploadPhotoController {
    constructor (UploadService) {
        this.userId = this.userId || '';
        this.url = `/user/${this.userId}/avatar`;
        this.uploadService = UploadService;
    }
}

uploadPhotoController.$inject = ['uploadService'];

export { uploadPhotoController };
