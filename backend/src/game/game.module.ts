import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { AppGateway } from '../app.gateway';

@Module({
	imports: [],
	controllers: [GameController],
	providers: [GameService, AppGateway],
	exports: []
})
export class GameModule {}
