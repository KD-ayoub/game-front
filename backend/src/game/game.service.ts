import { Injectable } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { AppGateway } from '../app.gateway';

//game
import { Ball } from './assets/Ball';
import { Paddle } from './assets/Paddle';

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
	private pendingPlayer: Array<{socket: Socket, ball: Ball, paddle: Paddle, key: string, value: string}>;
	private playerRoom: Map<string, Array<{socket: Socket, ball: Ball, paddle: Paddle, key: string, value: string}> >;
	private check: number;

	constructor(private Gateway: AppGateway) {
		this.pendingPlayer = new Array();
		this.playerRoom = new Map();
		this.check = 0;
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

	makeRoomName() {
		return 'Room: ' + this.pendingPlayer[0].value + ' | ' +  this.pendingPlayer[1].value;
	}

	getRoomSocket() {
		return this.pendingPlayer.splice(0, 2);
	}

	@SubscribeMessage('joinToPlayWithRandom')
	joinToPlayWithRandom(@ConnectedSocket() client: Socket) {
		//this.Gateway.print()
		//console.log(client.id);
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
		this.pendingPlayer.push({
			socket: client,
			ball: null,
			paddle: null,
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
			//console.log(this.pendingPlayer);
			//console.log(this.playerRoom);
			//this.ws.emit('redirectToGame', {room: roomName});
			this.ws.to(roomName).emit('redirectToGame', {room: roomName});
		}
		//console.log(this.Gateway.print());
		//console.log(this.ws);
		//this.server.emit('onMessage', "Hadi f game")
	}

	@SubscribeMessage('setGameDefaultData')
	setGameDefaultData(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		//here check if room exists in that map
		//console.log('setGameDefaultData');
		let find = this.playerRoom.get(payload.room);
		let i = find[0].value === client.id ? 0 : 1;
		//let chk = true;
		//console.log('i = ', i);
		//console.log(find[i]);
		//console.log('find = ', find[i].gameData, ' ', client.id);
		//find[i].gameData = new Game(payload);

		find[i].ball = new Ball(payload);
		let chk = (find[0].paddle || find[1].paddle) ? true : false;
		//console.log('chk = ', chk);
		find[i].paddle = new Paddle(payload, chk);

		//find[i].gameData = {
  	//	radius: payload.radius,
  	//	speed: payload.speed,
  	//	gap: payload.gap,
  	//	tableWidth: payload.tableWidth,
  	//	tableHeight: payload.tableHeight
		//};
		console.log('setGameDefaultData ', client.id);
		//console.log(find[i].gameData);
		//if (find[0].gameData && find[1].gameData) {
		if (find[0].ball && find[1].ball) {
			console.log('bjouj nadyin');
			const sight = find[0].ball.calculeBallSight();
			for (let i = 0; i != 2; i++)
				find[i].ball.setBallSight(sight);
			find[0].paddle.sight = "BOTTOM";
			//find[0].gameData.getdx = find[1].gameData.getdx;
			//find[0].gameData.getdy = find[1].gameData.getdy;
			//console.log('l = ', find[0].gameData);
			//console.log('l = ', find[1].gameData);
			//find[i].ball.setRenderingData(this.ws, payload.room, client.id);
			
			//this.ws.to(payload.room).emit("setGameDefaultRender",
			//[
			//	find[0].ball.getData(find[0].value),
			//	find[1].ball.getData(find[1].value)
			//],
			//[
			//	find[0].paddle.getData(find[0].value),
			//	find[1].paddle.getData(find[1].value)
			//]);
			console.log('still');
			//console.log('here ', find[0].paddle.sight);
			//console.log('here ', find[1].paddle.sight);
			console.log('paddle = ', find[0].value, ' ',  find[0].paddle);
			console.log('paddle = ', find[1].value, ' ',  find[1].paddle);
			this.ws.to(payload.room).emit("playNow");
			//emit here
		}
	}

	//@SubscribeMessage('ana')
	//ana(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @MessageBody() l: any) {
	//	console.log('ana = ', payload, l);
	//}

	//***************
	@SubscribeMessage('movePaddle')
	movePaddle(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		let find = this.playerRoom.get(payload.room);
		let i = find[0].value === client.id ? 0 : 1;
		//console.log('movePaddle');
		//if (payload.move === "right") {
		if (payload.move === "right" && !find[i].paddle.checkRightWall()) {
			find[i].paddle.movePaddle(payload.move);
			console.log('done');
		}
		//else if (payload.move === "left")
		else if (payload.move === "left" && !find[i].paddle.checkLeftWall())
			find[i].paddle.movePaddle(payload.move);
	}

	@SubscribeMessage('moveBall')
	moveBall(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
		//console.log('moveBall');
		//console.log('moveBall = ', client.id, ' ', payload);
		let find = this.playerRoom.get(payload.room);
		let i = find[0].value === client.id ? 0 : 1;
		let j = find[0].value !== client.id ? 0 : 1;
		//const data = {
		//	xDown: find[i].paddle.x,
		//	yDown: find[i].paddle.y,
    //  xUp: find[j].paddle.x,
    //  yUp: find[j].paddle.y,
    //  width: find[i].paddle.paddleWidth,
    //  height: find[i].paddle.paddleHeight
		//};
		const data = {
			xDown: find[0].paddle.x > find[1].paddle.x ? find[0].paddle.x : find[1].paddle.x,
			yDown: find[0].paddle.y > find[1].paddle.y ? find[0].paddle.y : find[1].paddle.y,
			xUp: find[0].paddle.x < find[1].paddle.x ? find[0].paddle.x : find[1].paddle.x,
			yUp: find[0].paddle.y < find[1].paddle.y ? find[0].paddle.y : find[1].paddle.y,
      //xUp: find[i].paddle.gap,
      //yUp: find[i].paddle.gap,
      width: find[i].paddle.paddleWidth,
      height: find[i].paddle.paddleHeight
		};
		//console.log('data = ', client.id, ' ', data);
		//if (!payload.firstTime)
		find[i].ball.updateBall(payload.delta, data);
		//if (!payload.firstTime) {
    //	if (find[i].gameData.x + find[i].gameData.r >= find[i].gameData.width)
		//		find[i].gameData.getdx = -find[i].gameData.getdx;
    //	else if (find[i].gameData.x - find[i].gameData.r <= 0)
		//		find[i].gameData.getdx = -find[i].gameData.getdx;
    //	else if (find[i].gameData.y + find[i].gameData.r >= find[i].gameData.height)
		//		find[i].gameData.getdy = -find[i].gameData.getdy;
    //	else if (find[i].gameData.y - find[i].gameData.r <= 0)
		//		find[i].gameData.getdy = -find[i].gameData.getdy;
		//	find[i].gameData.x += find[i].gameData.getdx * payload.delta;
		//	find[i].gameData.y += find[i].gameData.getdy * payload.delta;
		//}
		//will take off this one later
		this.check++;
		if (this.check == 2) {
			//console.log('move ball both');
			this.ws.to(payload.room).emit("drawGameAssets",
				[
					find[0].ball.getData(find[0].value),
					find[1].ball.getData(find[1].value)
				],
				[
					find[0].paddle.getData(find[0].value),
					find[1].paddle.getData(find[1].value)
				]
			);
			this.check = 0;
		}
	}

}

export class Game {
  private radius: number;
  private speed: number;
  private tableWidth: number;
  private tableHeight: number;
  private xpos: number;
  private ypos: number;
  private dx: number;
  private dy: number;
  private gap: number;

	//paddle
	private paddleWidth: number;
  private paddleHeight: number;
	private xoppPaddle: number; 
	private yoppPaddle: number;
	private xplayerPaddle: number;
	private yplayerPaddle: number;

	constructor(data: any) {
		console.log('constructor Game');
    this.radius = data.tableWidth / 30;
    this.speed = (data.tableWidth < 400) ? 0.2 : 0.3;
    this.gap = data.tableWidth < 400 ? 3 : 5;
    this.tableWidth = data.tableWidth;
    this.tableHeight = data.tableHeight;
    this.xpos = data.tableWidth / 2;
    this.ypos = data.tableHeight / 2;
    let sight = 0;
    while (!this.checkAngle((sight * 180) / Math.PI))
      sight = this.randomNumber(0, 2 * Math.PI);
    const direction = {
      x: Math.cos(sight),
      y: Math.sin(sight),
    };
    this.dx = direction.x * this.speed;
    this.dy = direction.y * this.speed;

		//those are for paddle
    this.paddleWidth = this.tableWidth / 3;
    this.paddleHeight = this.tableWidth < 400 ? 6 : 12;
    this.xplayerPaddle = this.gap;
    //this.yplayerPaddle = this.gap;
    this.xoppPaddle = this.tableWidth - this.paddleWidth - this.gap;
    //this.yoppPaddle = table.height - paddleHeight - wallGap;
    //direction to start
    //this.reset();
	}

	get xplayer() {
		return this.xplayerPaddle;
	}

	get xopp() {
		return this.xoppPaddle;
	}

  checkAngle(angle: number) {
    if (
      (angle >= 0 && angle <= 25) ||
      (angle >= 80 && angle <= 100) ||
      (angle >= 155 && angle <= 205) ||
      (angle >= 260 && angle <= 290) ||
      (angle >= 335 && angle <= 360)
    )
      return false;
    return true;
  }

  randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

	get x() {
		return this.xpos;
	}

	set x(value) {
		this.xpos = value;
	}

	get y() {
		return this.ypos;
	}

	get getdx() {
		return this.dx;
	}

	set getdx(value) {
		this.dx = value;
	}

	set getdy(value) {
		this.dy = value;
	}

	get getdy() {
		return this.dy;
	}

	get width() {
		return this.tableWidth;
	}

	get height() {
		return this.tableHeight;
	}

	set y(value) {
		this.ypos = value;
	}

	get r() {
		return this.radius;
	}
}
