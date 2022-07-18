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
import { EventService } from './event.service';
import { Event } from './models/event.model';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEvent } from './dto/update-event.input';
import { User } from '../users/models/user.model';
import { EventAttendee } from './models/attendee.model';
import { CreateAttendeeInput } from './dto/create-attendee.input';

@Resolver(() => Event)
@UseGuards(GqlAuthGuard)
export class EventResolver {
  constructor(
    private eventService: EventService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Event)
  async event(@UserEntity() user: User, @Args('id') id: number) {
    return this.prisma.event.findFirst({
      where: { id, AND: { hostId: user.id } },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Event])
  async events(@UserEntity() user: User) {
    return this.prisma.event.findMany({
      where: { hostId: user.id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  async createEvent(
    @UserEntity() user: User,
    @Args('data') newEventData: CreateEventInput
  ) {
    return this.eventService.createEvent(user.id, newEventData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  async updateEvent(
    @UserEntity() user: User,
    @Args('id') id: number,
    @Args('data') updateEventData: UpdateEvent
  ) {
    return this.eventService.updateEvent(id, updateEventData);
  }

  @ResolveField('user', () => User)
  user(@Parent() event: Event) {
    return this.prisma.user.findFirst({
      where: { id: event.hostId },
    });
  }

  @ResolveField('attendees', () => [EventAttendee])
  attendees(@Parent() event: Event) {
    return this.prisma.eventAttendee.findMany({
      where: { eventId: event.id },
    });
  }
}

@Resolver(() => EventAttendee)
@UseGuards(GqlAuthGuard)
export class EventAttendeeResolver {
  constructor(
    private attendeeService: EventService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => EventAttendee)
  async attendee(@UserEntity() user: User, @Args('id') id: number) {
    return this.prisma.eventAttendee.findFirst({
      where: { id, AND: { userId: user.id } },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [EventAttendee])
  async attendees(@UserEntity() user: User) {
    return this.prisma.eventAttendee.findMany({
      where: { userId: user.id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EventAttendee)
  async createEventAttendee(
    @UserEntity() user: User,
    @Args('data') newAttendeeData: CreateAttendeeInput
  ) {
    return this.attendeeService.createEventAttendee(user.id, newAttendeeData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EventAttendee)
  async deleteAttendee(
    @UserEntity() user: User,
    @Args({ name: 'ids', type: () => [Number] }) ids: number[]
  ) {
    return this.attendeeService.deleteEventAttendee(ids);
  }
}
