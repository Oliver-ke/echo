import { PrismaService } from 'nestjs-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { CreateThreadInput } from './dto/create-thread.input';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  createMessageThread(userId: number, newThread: CreateThreadInput) {
    return this.prisma.messageThread.create({
      data: {
        guestId: newThread.guestId,
        creatorId: userId,
      },
    });
  }

  async createMessage(userId: number, newMessage: CreateMessageInput) {
    const hasThread = await this.prisma.messageThread.findFirst({
      where: { id: newMessage.threadId },
    });
    if (!hasThread)
      throw new NotFoundException('No thread created for this message');

    return this.prisma.message.create({
      data: {
        content: newMessage.content,
        fromUserId: userId,
        toUserId: newMessage.toUserId,
        threadId: newMessage.threadId,
      },
    });
  }
}
