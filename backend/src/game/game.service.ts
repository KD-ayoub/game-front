import { Injectable } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { AppGateway } from '../app.gateway';

//game
import { Ball } from './assets/Ball';
import { Paddle } from './assets/Paddle';

//cookies
import * as Cookies from 'cookie';
import * as cookiesParser from 'cookie-parser';

type PlayerData = Array<{socket: Socket, ball: Ball, paddle: Paddle, playerId: string, socketId: string, emit: boolean}>;

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
	private pendingPlayer: PlayerData;
	private gameRoom: Map<string, PlayerData>;
	private check: number;
	//tst
	private cli: Array<Socket>;
	private a: number;

	private hitWall: boolean;
	constructor(private Gateway: AppGateway, private prisma: PrismaService) {
		this.pendingPlayer = new Array();
		this.gameRoom = new Map();
		//tst
		this.cli = new Array();
		this.a = 0;

		this.check = 0;
		this.hitWall = false;
	}

	@WebSocketServer()
	ws: Server;



	//just test
	@SubscribeMessage('play')
	play(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		//this.Gateway.socketUser
		//this.cli.push(client);
		//this.a++;
		//if (this.a === 2) {
		//	this.cli[0].join('ana');
		//	this.cli[1].join('ana');
		//	this.ws.to('ana').emit('popup');
		//}

		//const player: {key: string, value: string} = this.Gateway.findSocketMap(payload);
		const player = this.Gateway.socketUser.get(payload);
		if (!player)
			return ;
		console.log('play = ', player.value);
		//this.ws.to(player.value).to(client.id).emit('popup');
		//this.ws.to(player).to(client.id).emit('popup');
		this.ws.to(player).emit('popup');
		//this.ws.to(client.id).emit('popup');
	}




	async handleConnection(client: Socket, ...args: any[]) {
		console.log('allez ', client.id);
		console.log(this.pendingPlayer);
		const userId: string = await this.Gateway.getIdFromCookie(client);
		if (!userId)
			return ;

		console.log('***********lenght gameRoom = ', this.gameRoom.size);
		//console.log('before = ', this.gameRoom);
		this.gameRoom.forEach((value, key) => {
			if (key.search(userId) > 0) {
				//const i: number = (value[0].socketId === userId) ? 0 : 1;
				const i: number = (value[0].playerId === userId) ? 0 : 1;
				//console.log('key = ', value[i].key, ' value = ', value[i].value);
				value[i].socket.leave(key);
				value[i].socket = client;
				value[i].socketId = client.id;
				client.join(key);
				//console.log('key = ', value[i].key, ' value = ', value[i].value);
			}
		})
		//console.log('after = ', this.gameRoom);
	}

	handleDisconnect(client: Socket) {
		console.log('allez bye ', client.id);
		console.log('allez bye ', this.pendingPlayer);
		for (let i: number = 0; i != this.pendingPlayer.length; i++) {
			if (this.pendingPlayer[i].socketId === client.id) {
				this.pendingPlayer.splice(i, 1);
				break ;
			}
		}
		//here check the map too to  take off the player and end the game
	}

	@SubscribeMessage('playWithFriend')
	playWithFriend(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		//first check if the user is connected
	}

	//makeRoomName(playerOne, playerTwo) {
	generateNameGameRoom(): string {
		//return 'Room: ' + this.pendingPlayer[0].value + ' | ' +  this.pendingPlayer[1].value;
		return 'Room: ' + this.pendingPlayer[0].playerId + ' | ' +  this.pendingPlayer[1].playerId;
	}

	getGameRoomData(): PlayerData {
		return this.pendingPlayer.splice(0, 2);
	}

	setDataToBothPlayer(players: PlayerData): void {
		let sight;
		for (let i: number = 0; i != 2; i++) {
			players[i].ball = new Ball();
			sight = (!i) ? players[i].ball.calculeBallSight() : sight;
			players[i].ball.setBallSight(sight);
			players[i].paddle = new Paddle((!i) ? false : true);
		}
	}

	@SubscribeMessage('fireTheGameUp')
	async fireTheGameUP(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		let thatRoomGame = this.gameRoom.get(payload.room);
		let i = thatRoomGame[0].socketId === client.id ? 0 : 1;
		thatRoomGame[i].emit = true;
		if (thatRoomGame[0].emit && thatRoomGame[1].emit) {
			//thatRoomGame[0].emit = false;
			//thatRoomGame[1].emit = false;
			for (let i: number = 0; i != 2; i++) {
				await this.switchPlayerStatus(thatRoomGame[i].playerId, "at game");
				thatRoomGame[i].emit = false;
			}
			//console.log('play all');
			this.ws.to(payload.room).emit('playNow');
		}

	}

	@SubscribeMessage('joinToPlayWithRandom')
	joinToPlayWithRandom(@ConnectedSocket() client: Socket) {
		const player: {key: string, value: string} = this.Gateway.findSocketMap(client.id);
		if (!player)
			return ;
		//here in error just emit something
		//here also check if the user are in another room
		for (let i = 0; i != this.pendingPlayer.length; i++) {
			if (this.pendingPlayer[i].playerId === player.key) {
				console.log('already exists');
				return ;
			}
		}
		this.pendingPlayer.push({
			socket: client,
			ball: null,
			paddle: null,
			playerId: player.key,
			socketId: player.value,
			emit: false
		});
		if (this.pendingPlayer.length >= 2) {
			console.log('enter');
			const roomName: string = this.generateNameGameRoom();
			this.setDataToBothPlayer(this.pendingPlayer.slice(0, 2));
			this.pendingPlayer[0].socket.join(roomName);
			this.pendingPlayer[1].socket.join(roomName);
			this.gameRoom.set(roomName, this.getGameRoomData());
			//here join them in a room and emit in that room
			this.ws.to(roomName).emit('redirectToGame', {room: roomName});
			//this.ws.to(roomName).emit('playNow');
			//here idk if it gonna work proprely
			//console.log('wasir play now');
			//this.ws.to(roomName).emit("playNow");
			//console.log('****** wasir play now');
		}
	}

	//**NO NEED
	//@SubscribeMessage('setGameDefaultData')
	//setGameDefaultData(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
	//	//here check if room exists in that map
	//	let thatRoomGame: PlayerData = this.gameRoom.get(payload.room);
	//	let i = thatRoomGame[0].socketId === client.id ? 0 : 1;
	//	thatRoomGame[i].ball = new Ball();
	//	let chk = (thatRoomGame[0].paddle || thatRoomGame[1].paddle) ? true : false;
	//	//console.log('chk = ', chk);
	//	thatRoomGame[i].paddle = new Paddle(chk);

	//	//find[i].gameData = {
  //	//	radius: payload.radius,
  //	//	speed: payload.speed,
  //	//	gap: payload.gap,
  //	//	tableWidth: payload.tableWidth,
  //	//	tableHeight: payload.tableHeight
	//	//};
	//	console.log('setGameDefaultData ', client.id);
	//	//console.log(find[i].gameData);
	//	//if (find[0].gameData && find[1].gameData) {
	//	if (thatRoomGame[0].ball && thatRoomGame[1].ball) {
	//		console.log('bjouj nadyin');
	//		const sight = thatRoomGame[0].ball.calculeBallSight();
	//		for (let i = 0; i != 2; i++)
	//			thatRoomGame[i].ball.setBallSight(sight);
	//		thatRoomGame[0].paddle.sight = "BOTTOM";
	//		//find[0].gameData.getdx = find[1].gameData.getdx;
	//		//find[0].gameData.getdy = find[1].gameData.getdy;
	//		//console.log('l = ', find[0].gameData);
	//		//console.log('l = ', find[1].gameData);
	//		//find[i].ball.setRenderingData(this.ws, payload.room, client.id);
	//		
	//		//this.ws.to(payload.room).emit("setGameDefaultRender",
	//		//[
	//		//	find[0].ball.getData(find[0].value),
	//		//	find[1].ball.getData(find[1].value)
	//		//],
	//		//[
	//		//	find[0].paddle.getData(find[0].value),
	//		//	find[1].paddle.getData(find[1].value)
	//		//]);
	//		console.log('still');
	//		//console.log('here ', find[0].paddle.sight);
	//		//console.log('here ', find[1].paddle.sight);
	//		console.log('paddle = ', thatRoomGame[0].socketId, ' ',  thatRoomGame[0].paddle);
	//		console.log('paddle = ', thatRoomGame[1].socketId, ' ',  thatRoomGame[1].paddle);
	//		this.ws.to(payload.room).emit("playNow");
	//		//emit here
	//	}
	//}

	//***************
	@SubscribeMessage('movePaddle')
	movePaddle(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		console.log('id = ', client.id);
		let thatRoomGame = this.gameRoom.get(payload.room);
		let i = thatRoomGame[0].socketId === client.id ? 0 : 1;
		if (payload.move === "right" && !thatRoomGame[i].paddle.checkRightWall())
			thatRoomGame[i].paddle.movePaddle(payload.move);
		else if (payload.move === "left" && !thatRoomGame[i].paddle.checkLeftWall())
			thatRoomGame[i].paddle.movePaddle(payload.move);
	}

	resetGameData(thatRoomGame): void {
		const sight = thatRoomGame[0].ball.calculeBallSight();
		for (let i = 0; i != 2; i++) {
			thatRoomGame[i].ball.setBallSight(sight);
			thatRoomGame[i].ball.xpos = 50;
			thatRoomGame[i].ball.ypos = 50;
			thatRoomGame[i].paddle.pos = 50;
		}
		this.hitWall = false;
	}

	//async addGameHistory(fstPlayer: string, secPlayer: string): Promise<void> {
	async addGameHistory(players: [string, string], whoWin: number): Promise<void> {
		//xp add it in the level too
    const commingData = await this.prisma.games_history.createMany({
      data: [
        {
					player_id: players[0],
					opponent_id: players[1],
					xp_level: (!whoWin) ? 20 : 0,
					date: new Date(),
					result: (!whoWin) ? true : false
        },
        {
					player_id: players[1],
					opponent_id: players[0],
					xp_level: (whoWin) ? 20 : 0,
					date: new Date(),
					result: (whoWin) ? true : false
        }
      ]
    });
	}

	async addPlayerLevelXp(playerId: string) {
		const profile = await this.prisma.profile.update({
			where: {
				userID: playerId,
			},
			data: {
				level: {
					increment: 0.20,
				}
			}
		});
	}

	async switchPlayerStatus(playerId: string, status: string) {
		const profile = await this.prisma.user.update({
			where: {
				id: playerId
			},
			data: {
				is_active: status
			}
		});
	}

	@SubscribeMessage('ana')
	ana(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		console.log('****** reload ******');
	}

	@SubscribeMessage('cleanRoomGame')
	async cleanRoomGame(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		let thatRoomGame = this.gameRoom.get(payload.room);
		let i = thatRoomGame[0].socketId === client.id ? 0 : 1;

		thatRoomGame[i].emit = true;
		if (thatRoomGame[0].emit && thatRoomGame[1].emit) {
			console.log('done with the game');
			await this.addGameHistory([thatRoomGame[0].playerId, thatRoomGame[1].playerId],
				(thatRoomGame[0].paddle.winTimes > thatRoomGame[1].paddle.winTimes) ? 0 : 1);
			await this.addPlayerLevelXp((thatRoomGame[0].paddle.winTimes > thatRoomGame[1].paddle.winTimes)
				? thatRoomGame[0].playerId
				: thatRoomGame[1].playerId);
			for (let i: number = 0; i != 2; i++) {
				await this.switchPlayerStatus(thatRoomGame[i].playerId, "online");
				await thatRoomGame[i].socket.leave(payload.room);
			}
			//for (let i: number = 0; i != 2; i++)
			this.gameRoom.delete(payload.room);
			console.log('hadi map = ', this.gameRoom);
		}
	}

	@SubscribeMessage('moveBall')
	moveBall(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		console.log('moveBall');
		let thatRoomGame = this.gameRoom.get(payload.room);
		let i = thatRoomGame[0].socketId === client.id ? 0 : 1;
		const data = {
			upPos:
				(thatRoomGame[0].paddle.sight === "TOP") ? thatRoomGame[0].paddle.pos : thatRoomGame[1].paddle.pos,
			downPos:
				(thatRoomGame[0].paddle.sight === "BOTTOM") ? thatRoomGame[0].paddle.pos : thatRoomGame[1].paddle.pos
		};
		//here check if someone win
		if ((!thatRoomGame[0].paddle.win && !thatRoomGame[1].paddle.win) &&
				!thatRoomGame[i].ball.updateBall(payload.delta, data)) {
			const upPos = (thatRoomGame[0].paddle.sight === "TOP") ? thatRoomGame[0] : thatRoomGame[1];
			const downPos = (thatRoomGame[0].paddle.sight === "BOTTOM") ? thatRoomGame[0] : thatRoomGame[1];
			if (thatRoomGame[i].ball.ypos < 5) {
				downPos.paddle.win = true;
				downPos.paddle.winTimes++;
			}
			else if (thatRoomGame[i].ball.ypos > 95) {
				upPos.paddle.win = true;
				upPos.paddle.winTimes++;
			}
		}
		thatRoomGame[i].emit = true;
		if (thatRoomGame[0].emit && thatRoomGame[1].emit) {
			//hitwall add to the player
			if (thatRoomGame[0].paddle.win || thatRoomGame[1].paddle.win) {
				this.resetGameData(thatRoomGame);
				//if ((thatRoomGame[0].paddle.winTimes === 5) || (thatRoomGame[1].paddle.winTimes === 5)) {
				if ((thatRoomGame[0].paddle.winTimes + thatRoomGame[1].paddle.winTimes) === 5) {
					console.log('finish game');
					//******here i will send the data of the winnign and losing players
					//this.ws.to(payload.room).emit("finishGame");
					for (let i: number = 0; i != 2; i++) {
						thatRoomGame[i].emit = false;
						thatRoomGame[i].paddle.win = false;
					}
					return ;

					//await this.addGameHistory([thatRoomGame[0].playerId, thatRoomGame[1].playerId],
					//	(thatRoomGame[0].paddle.winTimes > thatRoomGame[1].paddle.winTimes) ? 0 : 1);
					//await this.addPlayerLevelXp((thatRoomGame[0].paddle.winTimes > thatRoomGame[1].paddle.winTimes)
					//	? thatRoomGame[0].playerId
					//	: thatRoomGame[1].playerId);
					//for (let i: number = 0; i != 2; i++)
					//	await this.switchPlayerStatus(thatRoomGame[i].playerId, "online");

					//this.gameRoom.delete(payload.room);
					//console.log(this.gameRoom);
        	//here take off the that room in map
				}
			}
			this.ws.to(payload.room).emit("drawGameAssets",
				[
					thatRoomGame[0].ball.getData(thatRoomGame[0].socketId),
					thatRoomGame[1].ball.getData(thatRoomGame[1].socketId)
				],
				[
					thatRoomGame[0].paddle.getData(thatRoomGame[0].socketId),
					thatRoomGame[1].paddle.getData(thatRoomGame[1].socketId)
				],
			);
			for (let i: number = 0; i != 2; i++) {
				thatRoomGame[i].emit = false;
				thatRoomGame[i].paddle.win = false;
			}
		}
	}
}
