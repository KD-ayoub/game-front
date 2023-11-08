import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("all_chats")
  get_all_chats()
  {
  }

  @Get("all_channels")
  get_all_channels()
  {
  }


  @Get("m_friends")
  get_all_friends()
  {
  }

  @Get("m_channels")
  get_all_mutual_channels()
  {
  }

  @Get("create_channel")
  get_channel()
  {
  }

  @Get("create_chat")
  get_chat()
  {
  }
}
