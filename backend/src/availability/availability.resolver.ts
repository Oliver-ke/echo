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
import { AvailabilityService } from './availability.service';
import { Availability } from './models/availability.model';
import { Appointment } from '../appointment/models/appointment.model';
import { CreateAvailabilityInput } from './dto/create-availability.input';
import { UpdateAvailabilityInput } from './dto/update-availability.input';
import { User } from '../users/models/user.model';

@Resolver(() => Availability)
@UseGuards(GqlAuthGuard)
export class AvailabilityResolver {
  constructor(
    private availabilityService: AvailabilityService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Availability)
  async availability(@UserEntity() user: User, @Args('id') id: number) {
    return this.prisma.availability.findFirst({
      where: { id, AND: { userId: user.id } },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Availability])
  async availabilities(@UserEntity() user: User) {
    return this.prisma.availability.findMany({
      where: { userId: user.id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Availability)
  async createAvailability(
    @UserEntity() user: User,
    @Args('data') newAppointmentData: CreateAvailabilityInput
  ) {
    return this.availabilityService.createAvailability(
      user.id,
      newAppointmentData
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Availability)
  async updateAvailability(
    @UserEntity() user: User,
    @Args('id') id: number,
    @Args('data') updateAvailabilityData: UpdateAvailabilityInput
  ) {
    return this.availabilityService.updateAvailability(
      id,
      updateAvailabilityData
    );
  }

  @ResolveField('user', () => User)
  user(@Parent() availability: Availability) {
    return this.prisma.user.findFirst({
      where: { id: availability.id },
    });
  }

  @ResolveField('appointments', () => Appointment)
  appointments(@Parent() availability: Availability) {
    return this.prisma.appointment.findMany({
      where: { guestAvailabilityId: availability.id },
    });
  }
}
