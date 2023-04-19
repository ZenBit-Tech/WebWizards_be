import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender, Role } from '../../../shared/enums';
import { mockDoctors } from './doctor.mock';
import DoctorService from '../doctor.service';
import Doctor from '../entity/doctor.entity';

describe('DoctorService', () => {
  let service: DoctorService;
  let repository: Repository<Doctor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    repository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(mockDoctors);

      const doctors = await service.getAllDoctors();
      expect(doctors).toEqual(mockDoctors);
    });
  });

  describe('findOne', () => {
    it('should return a doctor by id', async () => {
      const mockDoctor = mockDoctors[0];
      const id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockDoctor);

      const doctor = await service.getDoctorByID(id);
      expect(doctor).toEqual(mockDoctor);
    });

    it('should return null if doctor is not found', async () => {
      const id = 100;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const doctor = await service.getDoctorByID(id);
      expect(doctor).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing doctor by id', async () => {
      const id = 1;
      const mockDoctor = {
        id: 1,
        firstName: 'John',
        lastName: 'Doeee',
        phoneNumber: '+390992598283',
        email: 'john_doeee@gmail.com',
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
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockDoctor);
      jest.spyOn(repository, 'update').mockResolvedValue({
        raw: '',
        affected: 1,
        generatedMaps: [],
      });

      const updatedDoctor = await service.updateDoctor(id, mockDoctor);
      expect(updatedDoctor).toEqual(mockDoctor);
    });

    it('should return null if doctor is not found', async () => {
      const id = 100;
      const mockDoctor = {
        id: 100,
        firstName: 'John',
        lastName: 'Doeee',
        phoneNumber: '+390992598283',
        email: 'john_doeee@gmail.com',
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
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const updatedDoctor = await service.updateDoctor(id, mockDoctor);
      expect(updatedDoctor).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete an existing doctor by id', async () => {
      const id = 1;
      const mockDoctor = mockDoctors[0];

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockDoctor);
      jest.spyOn(repository, 'delete').mockResolvedValue({
        raw: '',
        affected: 1,
      });

      const deletedDoctor = await service.deleteDoctorById(id);
      expect(deletedDoctor).toEqual(mockDoctor);
    });

    it('should return null if doctor is not found', async () => {
      const id = 100;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const deletedDoctor = await service.deleteDoctorById(id);
      expect(deletedDoctor).toBeNull();
    });
  });
});
