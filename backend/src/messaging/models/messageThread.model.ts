import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';
import { Message } from './message.model';

@ObjectType()
export class MessageThread extends BaseModel {
  guestId: string;
  creator: User;
  creatorId: number;
  messages: Message[];
}
