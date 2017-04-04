import { GROUP_REPO_CONFIG } from '../repository.config';
import { AbstractRepository } from '../abstract.repository';
import { MessageModel } from './message.model';

class GroupMessageRepository extends AbstractRepository {
	constructor($http){
		super($http, GROUP_REPO_CONFIG, MessageModel);
	}

	getAllMessagesByGroupId(groupId) {
		return this.getDataByItemId(groupId, '/message');
	}

}

export { GroupMessageRepository };