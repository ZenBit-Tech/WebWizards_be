import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John' })
  @Column({
    unique: false,
    default: null,
  })
  firstName: string;

  @ApiProperty({ example: 'Nedoe' })
  @Column({
    unique: false,
    default: null,
  })
  lastName: string;

  @ApiProperty({ example: '+390992598283' })
  @Column({
    unique: true,
    default: null,
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({ example: 'john_nedoe@gmail.com' })
  @Column({
    unique: true,
    default: null,
  })
  @Column()
  email: string;

  @ApiProperty({ example: 'Berger Str. 22' })
  @Column({
    default: null,
  })
  @Column()
  address: string;

  @ApiProperty({ example: '2000-10-10' })
  @Column({
    default: null,
  })
  @Column()
  birthDate: string;

  @ApiProperty({ example: 'Berlin' })
  @Column({
    default: null,
  })
  @Column()
  city: string;

  @ApiProperty({ example: ' DE' })
  @Column({
    default: null,
  })
  @Column()
  country: string;

  @ApiProperty({ example: '(GMT+2) Europe/Berlin' })
  @Column({
    default: null,
  })
  @Column()
  timeZone: string;

  @ApiProperty({ example: ' Male' })
  @Column({
    default: null,
  })
  @Column()
  gender: string;
}