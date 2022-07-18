import { PrismaService } from 'nestjs-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEvent } from './dto/update-event.input';
import { CreateEventInput } from './dto/create-event.input';
import { CreateAttendeeInput } from './dto/create-attendee.input';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  createEvent(userId: number, newEvent: CreateEventInput) {
    return this.prisma.event.create({
      data: {
        completed: newEvent.completed,
        endDateTime: newEvent.endDateTime,
        meetingLink: newEvent.meetingLink,
        purpose: newEvent.purpose,
        startDateTime: newEvent.startDateTime,
        hostId: userId,
      },
    });
  }

  async updateEvent(id: number, updateData: UpdateEvent) {
    const eventExist = await this.prisma.event.findFirst({
      where: { id },
    });
    if (!eventExist) throw new NotFoundException('Event does not exist');

    return this.prisma.event.update({
      data: {
        completed: updateData.completed,
        endDateTime: updateData.endDateTime,
        meetingLink: updateData.meetingLink,
        purpose: updateData.purpose,
        startDateTime: updateData.startDateTime,
      },
      where: {
        id,
      },
    });
  }

  deleteEvent(ids: number[]) {
    return this.prisma.event.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  // attendee CRUD

  createEventAttendee(userId: number, newAttendee: CreateAttendeeInput) {
    return this.prisma.eventAttendee.create({
      data: {
        eventId: newAttendee.eventId,
        userId: userId,
      },
    });
  }

  deleteEventAttendee(ids: number[]) {
    return this.prisma.eventAttendee.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
