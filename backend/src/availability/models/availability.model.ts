import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Appointment } from '../../appointment/models/appointment.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Availability extends BaseModel {
  active: boolean;

  available: boolean;

  startTimeDate: Date;

  endTimeDate: Date;

  user: User;

  userId: number;

  appointments: Appointment[];
}
