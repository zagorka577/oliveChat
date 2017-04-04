class SignUpController {
    constructor($window, $state, UserRepository, LoginUserStorageService) {
        this.$state = $state;
        this.localStorage = $window.localStorage;
        this.userRepository = UserRepository;
        this.loginUserStorageService = LoginUserStorageService;
        
        this.keyStorage = 'loginUserId';

        this.nameTaken = false;
        this.emailTaken = false;
        this.registrationData = {
            name: '',
            email: '',
            password: ''
        }
    }

    registrateUser() {
        console.log('$state: ', this.$state);
        this.userRepository.createUser(this.registrationData)
                .then(response => {
                    console.log('response from back', response);
                    if(response.nameUsed) {
                        this.nameTaken = true;
                        return this.nameTaken;
                    }

                    if(response.emailUsed) {
                        this.emailTaken = true;
                        return this.emailTaken;
                    }

                    this.localStorage.setItem(this.keyStorage, response.id);
                    this.loginUserStorageService.setLoginUserId();
                    this.$state.go('mainState');
                });
    }
}

SignUpController.$inject = ['$window', '$state', 'UserRepository', 'LoginUserStorageService']

export { SignUpController }