import {Module} from '@nestjs/common'
import { AppGateway } from 'src/app.gateway';
import { chatGateway } from './chat.gateway';
import { chatService } from './chat.service';
import { ChatController } from './chat.controller';


@Module({
	controllers:[ChatController],
	providers:[AppGateway, chatGateway,chatService]
})
export class ChatModule{}

