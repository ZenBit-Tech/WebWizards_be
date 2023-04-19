import { Gender, Role } from '../../../shared/enums';
import Doctor from '../entity/doctor.entity';

export const mockDoctors: Doctor[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+390992598283',
    email: 'john_doe@gmail.com',
    password: '11111111Qq',
    role: Role.Remote,
    isVerified: true,
    activationLink: '???',
    address: 'Berger Str. 22',
    country: 'DE',
    city: 'Berlin',
    birthDate: '20-01-2000',
    gender: Gender.Male,
    specialization: 1,
    photoUrl: null,
    timeZone: '(GMT+2) Europe/Berlin',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Marlie',
    phoneNumber: '+390992598282',
    email: 'bob_marlie@gmail.com',
    password: '11111111Qq',
    role: Role.Remote,
    isVerified: true,
    activationLink: '???',
    address: 'Berger Str. 23',
    country: 'DE',
    city: 'Berlin',
    birthDate: '20-01-2000',
    gender: Gender.Male,
    specialization: 1,
    photoUrl: null,
    timeZone: '(GMT+2) Europe/Berlin',
  },
];

export const doctorServiceMock = {
  findAll: jest.fn().mockResolvedValue(mockDoctors),
  findOne: jest
    .fn()
    .mockImplementation((id: number) =>
      Promise.resolve(mockDoctors.find((doctor) => doctor.id === id)),
    ),
  create: jest
    .fn()
    .mockImplementation((doctor: Doctor) =>
      Promise.resolve({ id: 4, ...doctor }),
    ),
  update: jest
    .fn()
    .mockImplementation((id: number, doctor: Doctor) =>
      Promise.resolve({ id, ...doctor }),
    ),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};
