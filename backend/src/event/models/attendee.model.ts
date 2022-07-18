import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';
import { Event } from './event.model';

@ObjectType()
export class EventAttendee extends BaseModel {
  user: User;
  userId: number;
  event: Event;
  eventId: number;
}
