import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { ADDRESS_REGEX, CITY_REGEX, DATE_REGEX } from 'src/shared/consts';
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
    example: 'Male',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: "Doctor's birthday",
    example: '10/20/1980',
  })
  @Matches(DATE_REGEX, {
    message: 'Invalid date type',
  })
  dateOfBirth: string;

  @ApiProperty({
    description: "Doctor's country",
    example: 'DE',
  })
  @IsISO31661Alpha2()
  @IsString()
  country: string;

  @ApiProperty({
    description: "Doctor's city",
    example: 'Frankfurt',
  })
  @Matches(CITY_REGEX, {
    message: 'Invalid city name',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: "Doctor's address",
    example: 'Berger Str. 22',
  })
  @Matches(ADDRESS_REGEX, {
    message: 'Invalid string',
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
