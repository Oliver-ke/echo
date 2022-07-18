import { Module } from '@nestjs/common';
import { MessageResolver } from './messaging.resolver';
import { MessagingService } from './messaging.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [],
  providers: [MessageResolver, MessagingService, PasswordService],
})
export class MessagingModule {}
