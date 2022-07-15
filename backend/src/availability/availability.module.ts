import { Module } from '@nestjs/common';
import { AvailabilityResolver } from './availability.resolver';
import { AvailabilityService } from './availability.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [],
  providers: [AvailabilityResolver, AvailabilityService, PasswordService],
})
export class AvailabilityModule {}
