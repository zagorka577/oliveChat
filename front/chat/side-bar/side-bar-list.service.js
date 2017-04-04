class SideBarListService {
	constructor(GroupRepository,
				GroupUserRepository,
				MessageListService,
				LoginUserStorageService) {
		this.groupRepository = GroupRepository;
		this.groupUserRepository = GroupUserRepository;
		this.messageListService = MessageListService;
		this.loginUserStorageService = LoginUserStorageService;

		this.activeGroup;

		this._groupList = [];
		this._userList = [];

		this._addUserList = [];
		this.isAddGroupModalActive = false;
		
		this.getDialogList()
	}

	get groupList() {
		return this._groupList;
	}

	get userList() {
		return this._userList;
	}

	get addUserList() {
		return this._addUserList;
	}

	getDialogList(){
		this.loginUserStorageService.loginUser.then(loginUser => {
			this.joinPrivateChatGroup(loginUser);
			this._userList.unshift(loginUser);
			loginUser.acl.permissions.map(permission => {
				if(permission.entity.groupUsers.length == 2) {
					this.groupUserRepository.getAllUsersByGroupId(permission.entity._id)
										.then(allUsers => {
											allUsers.map(user => {
												if(user.id != loginUser.id)
												this._userList.push(user);
											})
										})
										.catch(error => {
											console.log(error);
										})
				}
				if(permission.entity.groupUsers.length > 2) {
					this.groupRepository.getGroup(permission.entity._id)
										.then(group => {
											this._groupList.push(group);
										})
										.catch(error => {
											console.log(error);
										})
				}
			});
		})
	}

	joinChatGroup(group) {
		this.activePrivetgroup = null;
		this.activeGroup = group.id;
		this.messageListService.joinChatGroup(group.id);
	}

	joinPrivateChatGroup(user) {
		this.activeGroup = null;
		this.activePrivetgroup = user.id;


		this.loginUserStorageService.loginUser.then(loginUser => {
			loginUser.acl.permissions.map(permission => {
				if(permission.entity.groupUsers.length == 2) {
						permission.entity.groupUsers.map(member => {
							if(member == user.id) {
								this.messageListService.joinChatGroup(permission.entity._id);
							}
						});
					}
				if(permission.entity.groupUsers.length == 1) {
					this.messageListService.joinChatGroup(permission.entity._id);
				}
			});
		});
	}

	toggleModalWindow() {
		this.isAddGroupModalActive = !this.isAddGroupModalActive;
	}

	toggleUserInGroup(user) {
		let indexOfUser = this._addUserList.indexOf(user.id);
		if(indexOfUser == -1) {
			this._addUserList.push(user.id);
		}
		if(indexOfUser != -1) {
			this._addUserList.splice(indexOfUser, 1);
		}
	}

	createGroup(groupName) {
		this.loginUserStorageService.loginUser.then(loginUser => {
			this.groupRepository.createGroup({
				authorId: loginUser.id,
				groupUsers: this._addUserList,
				meta: {
					groupName: groupName,
				}
			})
			.then(response => {
				this._groupList.push(response);
				this._addUserList = [];
			})
			.catch(error => {
				console.log(error);
			});
		})
	}
}

SideBarListService.$inject = [
								'GroupRepository',
								'GroupUserRepository',
								'MessageListService',
								'LoginUserStorageService'
							 ]

export { SideBarListService };