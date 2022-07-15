import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;

  @Field({ nullable: true })
  guestId: number;

  @Field({ nullable: true })
  guestAvailabilityId: number;

  @Field({ nullable: true })
  about?: string;
}
