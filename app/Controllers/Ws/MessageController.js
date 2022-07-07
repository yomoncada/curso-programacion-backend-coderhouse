'use strict'
const MessageService = use('App/Services/MessageService')

class MessageController {
	constructor ({ socket, request }) {
		this.service = new MessageService
        this.socket = socket
        this.request = request

		const messages = await this.service.getMessages()

		this.socket.broadcastToAll('messages', messages)
    }

	async onNewMessage(message) {
		try {
			await this.service.createMessage(message)
	
			const messages = await this.service.getMessages()
	
			this.socket.broadcastToAll('messages', messages)
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = MessageController