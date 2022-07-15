import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentInput {
  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field({ nullable: true })
  guestAvailabilityId?: number;

  @Field({ nullable: true })
  about?: string;
}
