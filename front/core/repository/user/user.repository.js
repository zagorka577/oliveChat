import { USER_REPO_CONFIG } from '../repository.config';
import { AbstractRepository } from '../abstract.repository';
import { UserModel } from './user.model';

class UserRepository extends AbstractRepository {
	constructor($http) {
		super($http, USER_REPO_CONFIG, UserModel);
	}

	getUser(userId) {
		return this.getItem(userId);
	}

	getAllUsers() {
		return this.getAll();
	}

	getAllUsersByQuery(query) {
		return this.getAllItemsByQuery(query);
	}

	createUser(user) {
		return this.createItem(user);
	}

	updateUser(userId, user) {
		return this.updateItem(userId, user);
	}

	deleteUser(user) {
		return this.deleteItem(user._id);
	}
}

export { UserRepository };