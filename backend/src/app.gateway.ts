import { Injectable, UseGuards, Req, OnModuleInit } from '@nestjs/common';
import { Request } from 'express';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

import * as Cookies from 'cookie';
import * as cookiesParser from 'cookie-parser';

@Injectable()
@WebSocketGateway({
  //transports: ['websocket'],
  cors: {
    origin: '*',
  },
	//namespace: '/',
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private socketUser;

	constructor(private prisma: PrismaService) {
		this.socketUser = new Map();
	}

	print(): void {
		console.log('size = ', this.socketUser.size);
		this.socketUser.forEach((value, key) => {
			console.log(`key = ${key} | value = ${value}`);
		})
	}

	async handleConnection(client: Socket, ...args: any[]) {
		console.log(`${client.id} is connect size = ${this.socketUser.size}`);
		const clientSocket = this.server.sockets.sockets.get(client.id);
		const cookie = client.request.headers.cookie;
		if (!cookie) {
			clientSocket.disconnect();
			return ;
		}
		const parse = Cookies.parse(cookie);
		const sid = cookiesParser.signedCookie(parse['connect.sid'], process.env.SESSION_SECRET);
		const sessionDb = await this.prisma.session.findUnique({
			where: {
				sid,
			}
		});
		if (!sessionDb) {
			clientSocket.disconnect();
			return ;
		}
		const db = JSON.parse(sessionDb.data).passport;
		if (!db || !db.user || !db.user.id) {
			clientSocket.disconnect();
			return ;
		}
		this.socketUser.set(db.user.id, client.id);
	}

	handleDisconnect(client: Socket) {
		console.log('client just disconnect');
		let findValue;
		this.socketUser.forEach((value, key) => {
			findValue = value === client.id ? client.id : "";
		})
		if (findValue)
			this.socketUser.delete(findValue);
	}

	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		console.log(body);
		this.server.emit('onMessage', "awili")
	}
}
