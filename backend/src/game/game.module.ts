import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
	imports: [GatewayModule],
	controllers: [GameController],
	providers: [GameService],
	exports: []
})
export class GameModule {}
