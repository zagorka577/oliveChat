import { UserRepository } from './user/user.repository';
import { GroupUserRepository } from './user/group-user.repository';
import { MessageRepository } from './message/message.repository';
import { GroupMessageRepository } from './message/group-message.repository';
import { GroupRepository } from './group/group.repository';
import { LoginRepository } from './login/login.repository';

const repositoryModule = angular.module('app.core.repository',[])
                                .service('UserRepository', UserRepository)
                                .service('GroupUserRepository', GroupUserRepository)
                                .service('MessageRepository', MessageRepository)
                                .service('GroupMessageRepository', GroupMessageRepository)
                                .service('GroupRepository', GroupRepository)
                                .service('LoginRepository', LoginRepository)
                                .name;

export { repositoryModule };