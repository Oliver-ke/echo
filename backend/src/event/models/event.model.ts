import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';
import { EventAttendee } from './attendee.model';

@ObjectType()
export class Event extends BaseModel {
  purpose: string;
  meetingLink: string;
  completed: boolean;
  startDateTime: Date;
  endDateTime: Date;
  host: User;
  hostId: number;
  attendees: EventAttendee[];
}
