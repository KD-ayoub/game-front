import { Module } from '@nestjs/common';
import { GameController } from './game.controller';

@Module({
	imports: [],
	controllers: [GameController],
	providers: [],
	exports: []
})
export class GameModule {}
