import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { MessageThread } from './messageThread.model';

@ObjectType()
export class Message extends BaseModel {
  content: string;
  toUserId: string;
  fromUserId: string;
  thread: MessageThread;
  threadId: number;
}
