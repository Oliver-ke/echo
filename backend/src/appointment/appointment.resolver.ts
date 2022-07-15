import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AppointmentService } from './appointment.service';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentInput } from './dto/create-appointment-input';
import { UpdateAppointmentInput } from './dto/update-appointment-input';
import { User } from '../users/models/user.model';
import { AppointMentStatus } from '@prisma/client';

@Resolver(() => Appointment)
@UseGuards(GqlAuthGuard)
export class AppointmentResolver {
  constructor(
    private appointmentService: AppointmentService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Appointment)
  async appointment(@UserEntity() user: User, @Args('id') id: number) {
    return this.prisma.appointment.findFirst({
      where: { id, AND: { OR: [{ userId: user.id }, { guestId: user.id }] } },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Appointment)
  async createAppointment(
    @UserEntity() user: User,
    @Args('data') newAppointmentData: CreateAppointmentInput
  ) {
    return this.appointmentService.createAppointment(
      user.id,
      newAppointmentData
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Appointment)
  async updateAppointment(
    @UserEntity() user: User,
    @Args('id') id: number,
    @Args('data') updateAppointmentData: UpdateAppointmentInput
  ) {
    return this.appointmentService.updateAppointment(id, updateAppointmentData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Appointment)
  async changeAppointmentStatus(
    @UserEntity() user: User,
    @Args('id') id: number,
    @Args('status') status: AppointMentStatus
  ) {
    return this.appointmentService.changeAppointmentStatus(id, status);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Appointment)
  async deleteAppointment(
    @UserEntity() user: User,
    @Args({ name: 'ids', type: () => [Number] }) ids: number[]
  ) {
    return this.appointmentService.deleteAppointment(ids);
  }

  @ResolveField('user', () => User)
  user(@Parent() appointment: Appointment) {
    return this.prisma.user.findFirst({
      where: { OR: [{ id: appointment.guestId }, { id: appointment.userId }] },
    });
  }

  @ResolveField('guestAvailability', () => User)
  guestAvailability(@Parent() appointment: Appointment) {
    return this.prisma.availability.findFirst({
      where: { id: appointment.guestAvailabilityId },
    });
  }
}
