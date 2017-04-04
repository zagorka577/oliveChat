class UploadService {
     constructor($window, Upload) {
         this.$window = $window;
         this.Upload = Upload;
     }
    
    submit(url) {
        if (this.upload_form.file.$valid && this.file) {
            this.upload(this.file, url);
        } else {
            //TODO: Provide display error on the view
            console.log("Select photo first!");
        }
    };
    
    upload(file, url) {
        this.Upload.upload({
            //TODO: Provide real path when baclend will be implement
            url: url,
            data:{file:file}
        }).then( resp => { 
            if(resp.data.error_code === 0){
                this.$window.alert('Picture ' + resp.config.data.file.name + ' uploaded succesfully.');
            } else {
                this.$window.alert('Error');
            }
        },  resp => {
            console.log('Error status: ' + resp.status);
            this.$window.alert('Error status: ' + resp.status);
        });
    };
}

UploadService.$inject=['$window', 'Upload'];

export { UploadService };