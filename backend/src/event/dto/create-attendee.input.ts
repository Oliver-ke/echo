import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttendeeInput {
  @Field({ nullable: false })
  userId: number;

  @Field({ nullable: false })
  eventId: number;
}
