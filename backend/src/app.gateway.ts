import { Injectable, UseGuards, Req, OnModuleInit } from '@nestjs/common';
import { Request } from 'express';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import * as Cookies from 'cookie';
import * as cookiesParser from 'cookie-parser';

@Injectable()
@WebSocketGateway({
  transports: ['WsAuthGuard'],
  cors: {
    origin: '*',
  },
	namespace: '/',
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private socketUser; constructor() {
		this.socketUser = new Map();
	}

	print(): void {
		this.socketUser.forEach((value, key) => {
			console.log(`key = ${key} | value = ${value.id}`);
		})
		//console.log('size = ', this.socketUser.size);
	}

	//addSocket(client: any, req: Request = getDefaultRequest()): void {
	//	//let req: Request;
	//	console.log(req);
	//	//const req = func();
	//	//console.log(req);
	//	//this.socketUser.set(0, client);
	//}

	handleConnection(client: Socket, ...args: any[]) {
		console.log(`${client.id} is connect size = ${this.socketUser.size}`);
		//this.server.on("disconnect", (socket) => {
		//	console.log('ll');
		//	socket.disconnect(true);
		//})
		//const cookie = client.handshake.headers.cookie;
		console.log('oo');
		const cookie = client.request.headers.cookie;
		console.log(cookie);
		console.log(client.id);
			//this.server.sockets.sockets.get(client.id).disconnect(true);
		console.log(this.server.sockets.sockets.get(client.id));
		//const clientMap: Map<string, Socket> = this.server.sockets;
		//console.log(clientMap);
		//this.disconnectClient(client.id);
		return ;
		if (!cookie) {
			//this.server.sockets.sockets[client.id].disconnect(true);
			//this.server.emit("disconnect", this.server);
			console.log('cc');
		}

		//	console.log('not exist');
		//else
		//	console.log('exist');

		const parse = Cookies.parse(cookie);
		console.log(parse);
		//console.log(parse['connect.sid']);
		const hld = cookiesParser.signedCookie(parse['connect.sid'], process.env.SESSION_SECRET);
		//if ()
		//const hld = cookiesParser.signedCookie(parse['connect.sid'], 'll');
		console.log(hld);
		//this.addSocket(client);
		//console.log(req.user);
		//this.socketUser.set(0, client);

		//this.socketUser.forEach((value, key) => {
		//	console.log(`key = ${key} | value = ${value}`);
		//})
	}

	deleteSocket(@Req() req?: any): void {
		this.socketUser.delete(req.user.id);
	}

	handleDisconnect(client: any) {
		//console.log(`${client.id} is disconnect`);
		//this.deleteSocket();
	}

	//disconnectClient(clientId: string) {
	//	console.log('wil');
	//	this.server.sockets.sockets[clientId].disconnect(true);
	//}


	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		console.log(body);
		this.server.emit('onMessage', "awili")
	}
}
