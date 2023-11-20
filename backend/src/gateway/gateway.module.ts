import { Module } from '@nestjs/common';
import { GatewayService } from './gateway';

@Module({
	imports: [],
	controllers: [],
	providers: [GatewayService],
	exports: [GatewayService]

})
export class GatewayModule {}
