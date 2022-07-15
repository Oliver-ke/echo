import { ObjectType, registerEnumType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { AppointMentStatus } from '@prisma/client';
import { Availability } from '../../availability/models/availability.model';
import { User } from 'src/users/models/user.model';

registerEnumType(AppointMentStatus, {
  name: 'AppointMentStatus',
  description: 'Current Status for appointment',
});

@ObjectType()
export class Appointment extends BaseModel {
  @Field(() => AppointMentStatus)
  status: AppointMentStatus;

  startDate: string;

  endDate: string;

  user: User;

  userId: number;

  guestId: number;

  guestAvailability: Availability;

  guestAvailabilityId: number;

  about: string;
}
