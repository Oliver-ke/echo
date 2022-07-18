import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateThreadInput {
  @Field({ nullable: false })
  guestId: number;
}
