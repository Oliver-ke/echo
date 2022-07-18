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
import { MessagingService } from './messaging.service';
import { Message } from './models/message.model';
import { CreateMessageInput } from './dto/create-message.input';
import { CreateThreadInput } from './dto/create-thread.input';
import { User } from '../users/models/user.model';
import { MessageThread } from './models/messageThread.model';

@Resolver(() => MessageThread)
@UseGuards(GqlAuthGuard)
export class MessageThreadResolver {
  constructor(
    private messagingService: MessagingService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => MessageThread)
  async messageThread(@UserEntity() user: User, @Args('id') id: number) {
    return this.prisma.messageThread.findFirst({
      where: { id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [MessageThread])
  async messageThreads(@UserEntity() user: User) {
    return this.prisma.messageThread.findMany({
      where: { creatorId: user.id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageThread)
  async createThread(
    @UserEntity() user: User,
    @Args('data') newThreadData: CreateThreadInput
  ) {
    return this.messagingService.createMessageThread(user.id, newThreadData);
  }

  @ResolveField('user', () => User)
  user(@Parent() messageThread: MessageThread) {
    return this.prisma.user.findFirst({
      where: { id: messageThread.creatorId },
    });
  }
}

@Resolver(() => Message)
@UseGuards(GqlAuthGuard)
export class MessageResolver {
  constructor(
    private messagingService: MessagingService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Message)
  async message(@UserEntity() user: User, @Args('id') id: number) {
    return this.prisma.message.findFirst({
      where: { id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async messages(@Args('thread') threadId: number) {
    return this.prisma.message.findMany({
      where: { threadId: threadId },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @UserEntity() user: User,
    @Args('data') newMessageData: CreateMessageInput
  ) {
    return this.messagingService.createMessage(user.id, newMessageData);
  }
}
