import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender, Role } from 'src/shared/enums';

export default class CreateDoctorDto {
  @ApiProperty({
    description: 'Doctor first name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Doctor last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "Doctor's email",
    example: 'john_doe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Doctor's password",
    example: 'R5bd7BBe',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Doctor's role",
    example: 'Local',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: "Doctor's specialization",
    example: 'Germany',
  })
  @IsString()
  specialization: string;

  @ApiProperty({
    description: "Doctor's gender",
    example: 'Local',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: "Doctor's birthday",
    example: '10/20/1980',
  })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({
    description: "Doctor's country",
    example: 'Germany',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: "Doctor's city",
    example: 'Frankfurt',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: "Doctor's address",
    example: 'Berger Str. 22',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: "Doctor's time zone",
    example: '(GMT+2) Europe/Berlin',
  })
  @IsString()
  timeZone: string;
}
