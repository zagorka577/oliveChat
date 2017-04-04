import { GROUP_REPO_CONFIG } from '../repository.config';
import { AbstractRepository } from '../abstract.repository';
import { UserModel } from './user.model';

class GroupUserRepository extends AbstractRepository {
	constructor($http){
		super($http, GROUP_REPO_CONFIG, UserModel);
	}

	getAllUsersByGroupId(groupId) {
		return this.getDataByItemId(groupId, '/user');
	}
}

export { GroupUserRepository };