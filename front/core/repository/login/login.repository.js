import { LOGIN_REPO_CONFIG } from '../repository.config';

class LoginRepository {
    constructor($http) {
        this.$http = $http;
        this.url = LOGIN_REPO_CONFIG.url;
    }

    login(item) {
        const url = this.url;
        return this.$http.post(url, item)
            .then(res => res.data);
    }
}

export { LoginRepository };