import { Injectable } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { AppGateway } from '../app.gateway';

@Injectable()
@WebSocketGateway({
  //transports: ['websocket'],
  cors: {
    origin: 'http://localhost:3000',
		credentials: true
  },
	//namespace: '/',
})
export class GameService implements OnGatewayConnection, OnGatewayDisconnect {
	private pendingPlayer: Array<{socket: Socket, key: string, value: string}>;
	private playerRoom: Map<string, Array<{key: string, value: string}> >;

	constructor(private Gateway: AppGateway) {
		this.pendingPlayer = new Array();
		this.playerRoom = new Map();
	}

	@WebSocketServer()
	ws: Server;

	handleConnection(client: Socket, ...args: any[]) {
		console.log('allez ', client.id);
	}

	handleDisconnect(client: Socket) {
		for (let i = 0; i != this.pendingPlayer.length; i++) {
			if (this.pendingPlayer[i].value === client.id) {
				this.pendingPlayer.splice(i, 1);
				break ;
			}
		}
		console.log('allez bye ', this.pendingPlayer);
		console.log('allez bye ', client.id);
	}

	playWithFriend(opponentId: string) {
		this.Gateway.print()
		//console.log(this.Gateway.print());
		//console.log(this.ws);
		//this.server.emit('onMessage', "Hadi f game")
	}

	//@SubscribeMessage('playRandom')
	//allez(@MessageBody() body: any) {
	//	console.log('wayli cool');
	//}

	@SubscribeMessage('moveBall')
	moveBall() {

	}

	makeRoomName() {
		return 'Room: ' + this.pendingPlayer[0].value + ' | ' +  this.pendingPlayer[1].value;
	}

	getRoomSocket() {
		return this.pendingPlayer.splice(0, 2);
	}

	@SubscribeMessage('joinToPlayWithRandom')
	joinToPlayWithRandom(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		this.Gateway.print()
		console.log(client.id);
		const find = this.Gateway.findSocketMap(client.id);
		if (!find)
			return ;
		//here in error just emit something
		//here also check if the user are in another room
		for (let i = 0; i != this.pendingPlayer.length; i++) {
			if (this.pendingPlayer[i].key === find.key) {
				console.log('already exists');
				return ;
			}
		}
		//console.log('find = ', find);
		this.pendingPlayer.push({
			socket: client,
			key: find.key,
			value: find.value
		});
		console.log('ll ', this.pendingPlayer);
		//btw i should always be checking so put it in a while
		if (this.pendingPlayer.length >= 2) {
			console.log('enter');
			const roomName: string = this.makeRoomName();
			this.pendingPlayer[0].socket.join(roomName);
			this.pendingPlayer[1].socket.join(roomName);
			this.playerRoom.set(roomName, this.getRoomSocket());
			//here join them in a room and emit in that room
			console.log(this.pendingPlayer);
			console.log(this.playerRoom);
			//this.ws.emit('redirectToGame', {room: roomName});
			this.ws.to(roomName).emit('redirectToGame', {room: roomName});
		}
		//console.log(this.Gateway.print());
		//console.log(this.ws);
		//this.server.emit('onMessage', "Hadi f game")
	}
}
