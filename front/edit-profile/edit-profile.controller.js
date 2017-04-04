class EditProfileController {
    constructor(UserRepository) {
        this.userData = {
            meta: {}
        }
        this.UserRepository = UserRepository;
        this.userId = "58d3c887f8021623ac7f1bc6";
    }
    
    updateUserData() {
        this.UserRepository.updateUser(this.userId, this.userData)
                           .then(response => {
                                console.log('response from back', response);
                           });
    }
}

EditProfileController.$inject = ['UserRepository']
export { EditProfileController }