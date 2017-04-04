import { GROUP_REPO_CONFIG } from '../repository.config';
import { AbstractRepository } from '../abstract.repository';
import { GroupModel } from './group.model';

class GroupRepository extends AbstractRepository {
	constructor($http){
		super($http, GROUP_REPO_CONFIG, GroupModel);
	}

	getGroup(groupId) {
		return this.getItem(groupId);
	}

	getAllGroups() {
		return this.getAll();
	}

	createGroup(group) {
		return this.createItem(group);
	}

	updateGroup(groupId, updatedGroup) {
		return this.updateItem(groupId, updatedGroup);
	}

	deleteGroup(groupId) {
		return this.deleteItem(groupId);
	}
}

export { GroupRepository };