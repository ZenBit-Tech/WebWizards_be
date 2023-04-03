import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John' })
  @Column({
    unique: false,
    default: null,
  })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column({
    unique: false,
    default: null,
  })
  lastName: string;

  @ApiProperty({ example: 'john_doe@gmail.com' })
  @Column({
    unique: true,
    default: null,
  })
  @Column()
  email: string;

  @ApiProperty({ example: 'R5bd7BBe' })
  @Column({
    default: null,
  })
  @Column()
  password: string;

  @ApiProperty({ example: 'Local' })
  @Column({
    default: null,
  })
  @Column()
  role: string;

  @ApiProperty({ example: 'Surgeon' })
  @Column({
    default: null,
  })
  @Column()
  specialization: string;

  @ApiProperty({ example: 'Male' })
  @Column({
    default: null,
  })
  @Column()
  gender: string;

  @ApiProperty({ example: '10/20/1980' })
  @Column({
    default: null,
  })
  @Column()
  dateOfBirth: string;

  @ApiProperty({ example: 'Germany' })
  @Column({
    default: null,
  })
  @Column()
  country: string;

  @ApiProperty({ example: 'Frankfurt' })
  @Column({
    default: null,
  })
  @Column()
  city: string;

  @ApiProperty({ example: 'Berger Str. 22' })
  @Column({
    default: null,
  })
  @Column()
  address: string;

  @ApiProperty({ example: '(GMT+2) Europe/Berlin' })
  @Column({
    default: null,
  })
  @Column()
  timeZone: string;
}
