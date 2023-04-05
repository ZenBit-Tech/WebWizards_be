import {
  Controller,
  Body,
  Post,
  Redirect,
  Param,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import CreateDoctorDto from '../doctor/dto/create-doctor.dto';
import AuthService from './auth.service';
import Doctor from '../doctor/entity/doctor.entity';

@ApiTags('Authorization')
@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  // @ApiOperation({ summary: 'Doctor login' })
  // @ApiResponse({ status: 201, type: Doctor })
  // @Post('/login')
  // async login(@Body() doctorDto: CreateDoctorDto) {
  //   return this.authService.login(doctorDto);
  // }

  @ApiOperation({ summary: 'Doctor registration' })
  @ApiResponse({ status: 201, type: Doctor })
  @Post('/registration')
  async registration(
    @Body() doctorDto: CreateDoctorDto,
  ): Promise<{ token: string }> {
    return this.authService.registration(doctorDto);
  }

  @ApiOperation({ summary: 'Account activation' })
  @ApiResponse({ status: 201, type: Doctor })
  @Get('/activation/:link')
  @Redirect('https://nestjs.com') // mock value
  async activation(@Param('link') link: string): Promise<void> {
    return this.authService.activation(link);
  }
}
export default AuthController;
