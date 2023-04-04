import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import DoctorService from './doctor.service';
import CreateDoctorDto from './dto/create-doctor.dto';
import Doctor from './entity/doctor.entity';
import AuthGuard from '../auth/auth.guard';

@Controller('doctor')
export default class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: 'Doctor creation' })
  @ApiResponse({ status: 201, type: Doctor })
  @Post()
  @UsePipes(new ValidationPipe())
  createDoctor(@Body() doctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.createDoctor(doctorDto);
  }

  @ApiOperation({ summary: 'Getting all doctors' })
  @ApiResponse({ status: 200, type: [Doctor] })
  @Get()
  getAll(): Promise<Doctor[]> {
    return this.doctorService.getAllDoctors();
  }

  @ApiOperation({ summary: 'Getting doctor by id' })
  @ApiResponse({ status: 200, type: Doctor })
  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.getDoctorByID(id);
  }
}
