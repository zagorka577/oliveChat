module.exports = function (io) {
	let messageNameSpace = io.of('messages');

	messageNameSpace.on('connection', socket => {
		socket.on('join:room', roomId => {
			socket.join(roomId);
		});

		socket.on('leave:room', roomId => {
			socket.leave(roomId);
		});

		socket.on('send:message', data => {
			socket.to(data.groupId).emit('send:message', data);
		});

		socket.on('typings:start', data => {
			socket.to(data.groupId).emit('typings:start', data.author);
		})

		socket.on('typings:end', data => {
			socket.to(data.groupId).emit('typings:end', data.author);
		})
	});
	
	io.listen(2000);
}