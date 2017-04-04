class SignInController {
    constructor(LoginRepository, LoginUserStorageService, $state, $http, $window) {
        this.userData = {
            name: '',
            password: ''
        }
        this.wrongUser = false;
        this.wrongPassword = false;

        this.loginRepository = LoginRepository;
        this.loginUserStorageService = LoginUserStorageService;
        
        this.$state = $state;
        this.$http = $http;
        this.localStorage = $window.localStorage;

        this.keyStorage = 'loginUserId';
    }

    loginUser() {
        this.wrongUser = false;
        this.wrongPassword = false;
        this.loginRepository.login(this.userData)
                            .then(res => {
                                if (res.wrongPassword) {
                                    this.wrongPassword = true;
                                    return false;
                                }
                                if(res.wrongUser) {
                                    this.wrongUser = true;
                                    return false;
                                }
                                this.$http.defaults.headers.common.Authorization = 'Bearer ' + res.token;
                                this.localStorage.setItem(this.keyStorage, res.user._id);
                                this.loginUserStorageService.setLoginUserId();
                                this.$state.go('mainState');
                            });
    }
}

SignInController.$inject = ['LoginRepository', 'LoginUserStorageService', '$state', '$http', '$window'];
export { SignInController }