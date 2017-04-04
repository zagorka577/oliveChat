class UserStorageService {
    constructor() {
        this.userData = {};
    }

    setItems(userData) {
        this.userData = userData;
    }

    getItems() {
        return this.userData;
    }
}

export { UserStorageService }