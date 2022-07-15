import { Module } from '@nestjs/common';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [],
  providers: [AppointmentResolver, AppointmentService, PasswordService],
})
export class AppointmentModule {}
