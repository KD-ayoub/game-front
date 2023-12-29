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
    origin: 'http://localhost:3000',
		credentials: true
  },
	//namespace: '/',
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private socketUser;

	//private i: number;
	constructor(private prisma: PrismaService) {
		this.socketUser = new Map();
		//this.i = 0;
	}

	print(): void {
		console.log('size = ', this.socketUser.size);
		if (this.socketUser.size) {
			this.socketUser.forEach((value, key) => {
				console.log(`key = ${key} | value = ${value}`);
			})
		}
		console.log('done');
	}

	async handleConnection(client: Socket, ...args: any[]) {
		//console.log(`${client.id} is connect size = ${this.socketUser.size}`);
		//error in disconnect
		console.log('hey ', client.id);
		const clientSocket = this.server.sockets.sockets.get(client.id);
		//this.socketUser.set(this.i.toString(), client.id);
		//this.i++;
		//console.log('add a socket to the map');
		//return ;
		//old logic for cookie now just trying
		const cookie = client.request.headers.cookie;
		console.log('cookie = ', cookie);
		if (!cookie) {
			console.log("no cookie");
			clientSocket.disconnect();
			return ;
		}
		const parse = Cookies.parse(cookie);
		const sid = cookiesParser.signedCookie(parse['connect.sid'], process.env.SESSION_SECRET);
		console.log(`sid = ${sid}`);
		const sessionDb = await this.prisma.session.findUnique({
			where: {
				sid,
			}
		});
		if (!sessionDb) {
			console.log("no session");
			clientSocket.disconnect();
			return ;
		}
		const db = JSON.parse(sessionDb.data).passport;
		if (!db || !db.user || !db.user.id) {
			clientSocket.disconnect();
			return ;
		}
		//if (this.socketUser.has(db.user.id)) {
		//	console.log('disconnect ', client.id);
		//	clientSocket.disconnect();
		//	return ;
		//}
		if (this.socketUser.has(db.user.id)) {
			console.log('disconnect ', client.id);
			const hldClient = this.server.sockets.sockets.get(this.socketUser.get(db.user.id));
			hldClient.disconnect();
			return ;
		}
		this.socketUser.set(db.user.id, client.id);
		console.log('add a socket to the map');
	}

	handleDisconnect(client: Socket) {
		//console.log('bye');
		const findValue = this.findSocketMap(client.id);
		//this.socketUser.forEach((value, key) => {
		//	findValue = value === client.id ? client.id : "";
		//})
		if (findValue)
			this.socketUser.delete(findValue.key);
		console.log('bye = ', this.socketUser);
	}

	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		console.log(body);
		this.server.emit('onMessage', body)
	}

	getKeyByValue(map: Map<any,any>,searchValue: any) {
		for (const [key, value] of this.socketUser.entries()) {
			if (value == searchValue)
				return key;
		}
	}

	//just for now
	findSocketMap(socketId: string) {
		for (const [key, value] of this.socketUser.entries()) {
			if (value === socketId)
				return {key, value};
		}
	}

	get_id_by_socketId(socketid : string) {
		return this.getKeyByValue(this.socketUser,socketid);
	}

	get_socketID_by_id(userid: string) {
		return this.socketUser.get(userid);
	}
}
