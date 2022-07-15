import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { UpdateAppointmentInput } from './dto/update-appointment-input';
import { CreateAppointmentInput } from './dto/create-appointment-input';
import { AppointMentStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  createAppointment(userId: number, newAppointData: CreateAppointmentInput) {
    return this.prisma.appointment.create({
      data: {
        about: newAppointData.about,
        endDate: newAppointData.endDate,
        guestAvailabilityId: newAppointData.guestAvailabilityId,
        guestId: newAppointData.guestId,
        startDate: newAppointData.startDate,
        userId,
      },
    });
  }

  updateAppointment(appointmentId: number, updateData: UpdateAppointmentInput) {
    return this.prisma.appointment.update({
      data: {
        about: updateData.about,
        endDate: updateData.endDate,
        guestAvailabilityId: updateData.guestAvailabilityId,
        startDate: updateData.startDate,
      },
      where: {
        id: appointmentId,
      },
    });
  }

  changeAppointmentStatus(appointmentId: number, newStatus: AppointMentStatus) {
    return this.prisma.appointment.update({
      data: {
        status: newStatus,
      },
      where: {
        id: appointmentId,
      },
    });
  }

  deleteAppointment(ids: number[]) {
    return this.prisma.appointment.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
