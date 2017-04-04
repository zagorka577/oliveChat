class AddGroupController {
	constructor(SideBarListService) {
		this.sideBarListService = SideBarListService;
		this.groupName = '';
	}

	isUserAdded(user) {
		let indexOfUser = this.sideBarListService.addUserList.indexOf(user.id);
		return indexOfUser != -1;
	}

	isCreateEnable() {
		return this.sideBarListService.addUserList.length < 2 || this.groupName == '';
	}

	createGroup() {
		this.sideBarListService.createGroup(this.groupName);
		this.sideBarListService.toggleModalWindow();
		this.groupName = '';
	}
}

AddGroupController.$inject = ['SideBarListService'];

export { AddGroupController };