class mainPanelController {
	constructor($scope, MessageListService, MessageSocketService) {
		this.messageListService = MessageListService;
		this.messageSocketService = MessageSocketService;
		this.messageBody = '';

		this.messageSocketService.typingsStartHandler
								 .subscribe(data => {
									 $scope.$digest();
								 });

		this.messageSocketService.typingsEndHandler
								 .subscribe(data => {
									 $scope.$digest();
								 });

		this.messageSocketService.sendMessageHandler
								 .subscribe(data => {
									 $scope.$digest();
								 });
		this.searchClick = false;

		this.searchClick = false;
		this.searchQuery = '';
	}

	get allMessages () {
		return this.messageListService.groupMessageList;
	}

	sendMessage($event, messageBody) {
		if($event.keyCode >= 48 && $event.keyCode <= 90
		|| $event.keyCode == 8 && $event.target.value != ''
		|| $event.keyCode == 32
		|| $event.keyCode == 46 && $event.target.value != ''
		|| $event.keyCode >= 96 && $event.keyCode <= 107
		|| $event.keyCode >= 109 && $event.keyCode <= 111
		|| $event.keyCode >= 186 && $event.keyCode <= 192
		|| $event.keyCode >= 219 && $event.keyCode <= 222
		) {
			this.messageSocketService.emitTypingsStart(this.messageListService.activeGroupId);
		}

		if (!$event.shiftKey && $event.keyCode === 13 && messageBody) {
			this.messageSocketService.emitTypingsEnd();
			this.messageListService.sendMessage($event, messageBody);
		}
	}

	toggleSearchClick() {
		this.searchClick = !this.searchClick;
		return this.searchClick;
	}
}

mainPanelController.$inject = ['$scope', 'MessageListService', 'MessageSocketService'];

export { mainPanelController };
