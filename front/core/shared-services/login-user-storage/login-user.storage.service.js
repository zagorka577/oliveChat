class LoginUserStorageService {
	constructor(UserRepository, $window) {
		this.userRepository = UserRepository;
		this._loginUser = {};
		this.localStorage = $window.localStorage;
		this.keyStorage = 'loginUserId';
		this.userId = 'test';

		this.setLoginUserId();
	}

	get loginUser() {
		if (this.userId) {
			return this.userRepository.getUser(this.userId)
						   	.then(user => {
								   this._loginUser = user;
							   	   return this._loginUser;
						   	});
		}


	}

	setLoginUserId () {
		this.userId = this.localStorage.getItem(this.keyStorage);
	}
}

LoginUserStorageService.$inject = ['UserRepository', '$window'];

export { LoginUserStorageService };