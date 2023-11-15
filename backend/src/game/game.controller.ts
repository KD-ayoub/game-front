import { Controller, Get } from '@nestjs/common';

@Controller('game')
export class GameController {
	@Get()
	get(): string {
		return 'here logic of the game';
	}
}
