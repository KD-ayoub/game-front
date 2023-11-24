import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { AppGateway } from '../app.gateway';

@Controller('game')
export class GameController {
	//constructor(private server: AppGateway) {}
	constructor(private GameService: GameService) {}

	@Get()
	get(): string {
		this.GameService.get();
		return 'here logic of the game';
	}
}
