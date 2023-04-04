import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import DoctorService from './doctor.service';
import CreateDoctorDto from './dto/create-doctor.dto';
import Doctor from './entity/doctor.entity';

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
  @Get('/id/:id')
  getOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.getDoctorByID(id);
  }

  @ApiOperation({ summary: 'Delete doctor by id' })
  @ApiResponse({ status: 200, type: [Doctor] })
  @Delete('/id/:id')
  deleteOne(@Param('id') id: number): Promise<void> {
    return this.doctorService.deleteDoctorById(id);
  }
}
