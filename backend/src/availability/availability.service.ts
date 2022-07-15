import { PrismaService } from 'nestjs-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAvailabilityInput } from './dto/update-availability.input';
import { CreateAvailabilityInput } from './dto/create-availability.input';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  createAvailability(userId: number, newAvailability: CreateAvailabilityInput) {
    return this.prisma.availability.create({
      data: {
        endTimeDate: newAvailability.endTimeDate,
        startTimeDate: newAvailability.startTimeDate,
        active: true,
        available: true,
        userId,
      },
    });
  }

  async updateAvailability(id: number, updateData: UpdateAvailabilityInput) {
    const availabilityExist = await this.prisma.availability.findFirst({
      where: { id },
    });
    if (!availabilityExist)
      throw new NotFoundException('Availability does not exist');

    return this.prisma.availability.update({
      data: {
        endTimeDate: updateData.endTimeDate,
        startTimeDate: updateData.startTimeDate,
        active: updateData.active,
        available: updateData.available,
      },
      where: {
        id,
      },
    });
  }

  deleteAvailability(ids: number[]) {
    return this.prisma.availability.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
