class SideBarController {
	constructor (SideBarListService) {
		this.sideBarListService = SideBarListService;
	}

	get groupList() {
		return this.sideBarListService.groupList;
	}

	get userList() {
		return this.sideBarListService.userList;
	}
}

SideBarController.$inject = ['SideBarListService']

export { SideBarController };