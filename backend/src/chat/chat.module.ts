import {Module} from '@nestjs/common'
import { AppGateway } from 'src/app.gateway';
import { chatGateway } from './chat.gateway';
import { chatService } from './chat.service';
import { ChatController } from './chat.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Module({
	controllers:[ChatController],
	providers:[AppGateway, chatGateway,chatService,CloudinaryService]
})
export class ChatModule{}

