import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DoctorController from './doctor.controller';
import DoctorService from './doctor.service';
import Doctor from './entity/doctor.entity';
import AuthGuard from '../auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorService, AuthGuard],
  controllers: [DoctorController],
})
export default class DoctorModule {}
