class CheckLoginController {
    constructor (LoginUserStorageService, $state) {
        this.loginUserStorageService = LoginUserStorageService;
        this.$state = $state;

        this.isLogined();
    }

    isLogined() {
        if(this.loginUserStorageService.userId) {
            this.$state.go('mainView');
        }
        else {
            this.$state.go('signIn');
        }
    }
}

CheckLoginController.$inject = ['LoginUserStorageService', '$state'];

export { CheckLoginController }
