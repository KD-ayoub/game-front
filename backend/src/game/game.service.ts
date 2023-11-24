import { Injectable } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { AppGateway } from '../app.gateway';

@Injectable()
@WebSocketGateway()
export class GameService {
	constructor(private Gateway: AppGateway) {}

	@WebSocketServer()
	ws: Server;

	//@SubscribeMessage('game')
	get() {
		this.Gateway.print()
		//console.log(this.Gateway.print());
		//console.log(this.ws);
		//this.server.emit('onMessage', "Hadi f game")
	}
}
