import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GatewayService implements OnModuleInit {
	onModuleInit() {
		console.log('hey');
		this.server.on('connection', (socket) => {
			console.log(`${socket.id} Connected`);
		});
	}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		console.log(body);
		this.server.emit('onMessage', "awili")
	}
}
