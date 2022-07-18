import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field({ nullable: false })
  purpose: string;

  @Field({ nullable: false })
  meetingLink: string;

  @Field({ nullable: true, defaultValue: false })
  completed: boolean;

  @Field({ nullable: false })
  startDateTime: Date;

  @Field({ nullable: false })
  endDateTime: Date;
}
