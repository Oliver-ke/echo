import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAvailabilityInput {
  @Field({ nullable: true })
  startTimeDate: Date;

  @Field({ nullable: true })
  endTimeDate: Date;
}
