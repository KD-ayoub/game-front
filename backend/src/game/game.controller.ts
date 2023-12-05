import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { AppGateway } from '../app.gateway';

@Controller('game')
export class GameController {
	//constructor(private server: AppGateway) {}
	constructor(private GameService: GameService) {}

	@Get('play_friend/:id')
	playWithFriend(@Param('id') opponentId: string): string {
		//console.log('lll');
		this.GameService.playWithFriend(opponentId);
		return 'here logic to play with a friend';
	}

	@Get('play_random')
	playRandom(): string {
		this.GameService.playRandom();
		return 'here logic to play with a random';
	}
}
