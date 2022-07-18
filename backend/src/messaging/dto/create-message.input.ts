import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  toUserId: number;

  @Field({ nullable: false })
  fromUserId: number;

  @Field({ nullable: false })
  threadId: number;
}
