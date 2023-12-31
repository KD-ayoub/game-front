import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GatewayService } from '../gateway/gateway';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(80)
export class GameService implements OnModuleInit {
	constructor(private prisma: PrismaService) {}

	onModuleInit() {
		console.log('hey');
		this.server.on('connection', (socket) => {
			console.log(`${socket.id} Connected`);
		});
	}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage('game')
	onNewMessage(@MessageBody() body: any) {
		console.log(body);
		this.server.emit('onMessage', "Hadi f game")
	}
}
