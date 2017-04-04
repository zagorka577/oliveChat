import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SocketService } from './../abstract-socket.service';


class MessageSocketService extends SocketService {
	constructor(LoginUserStorageService) {
		super();
		this.loginUserStorageService = LoginUserStorageService;

		this.connection = this.getConnection('messages');
		this.connectHandler = this.createHandler('connect');
		this.sendMessageHandler = this.createHandler('send:message');
		
		this.activeGroupId = '';

		this._typingsList = [];
		this.typingsSubjectStart = new Subject();
		this.isStartTypings = false;

		this.typingsSubjectStart
			.debounceTime(1500)
			.distinctUntilChanged()
			.subscribe(data => {
				this.emit('typings:end', data);
				this.isStartTypings = false;
			});

		this.typingsStartHandler = this.on('typings:start', author => {
			if(!this._typingsList.includes(author)){
				this._typingsList.unshift(author);
			
				if(this._typingsList.length > 2){
					this._typingsList.splice(2, 0, '...');
					return author;
				}

				return author;
			}

			if(this._typingsList.includes(author) && this._typingsList[0] != author) {
				this._typingsList.splice(this._typingsList.indexOf(author),1);
				this._typingsList.unshift(author);
			}
		});

		this.typingsEndHandler = this.on('typings:end', author => {
			if(this._typingsList.includes(author)){
				this._typingsList.splice(this._typingsList.indexOf(author),1);
			}
			if(this._typingsList.length <= 2 && this._typingsList.includes('...')) {
				this._typingsList.splice(this._typingsList.indexOf('...'),1);
			}
		})
	}

	emitTypingsEnd() {
		this.loginUserStorageService.loginUser.then(user => {
			this.emit('typings:end', {
				groupId: this.activeGroupId,
				author: user.name
			});
			this.isStartTypings = false;
		});
	}

	joinRoom(roomId) {
		this.emit('join:room', roomId);
	}

	leaveRoom(roomId) {
		this.emit('leave:room', roomId);
	}
	
	sendMessage(messageData) {
		this.emit('send:message', messageData);
	}

	emitTypingsStart(groupId, scope) {
		this.activeGroupId = groupId;
		this.loginUserStorageService.loginUser.then(user => {
			if(!this.isStartTypings) {
				this.emit('typings:start', {
					groupId: this.activeGroupId,
					author: user.name
				});
				this.isStartTypings = true;
			}

			this.typingsSubjectStart
				.next({
					groupId: groupId,
					author: user.name
				});
		});

	}

	get typingsList() {
		return this._typingsList;
	}
}

MessageSocketService.$inject = ['LoginUserStorageService'];

export { MessageSocketService }