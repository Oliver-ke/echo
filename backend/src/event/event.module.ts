import { Module } from '@nestjs/common';
import { EventResolver, EventAttendeeResolver } from './event.resolver';
import { EventService } from './event.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [],
  providers: [
    EventResolver,
    EventService,
    PasswordService,
    EventAttendeeResolver,
  ],
})
export class EventModule {}
