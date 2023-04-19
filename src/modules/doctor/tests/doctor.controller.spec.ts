import { Test } from '@nestjs/testing';
import { mockDoctors, doctorServiceMock } from './doctor.mock';
import DoctorService from '../doctor.service';
import DoctorController from '../doctor.controller';
import { Gender, Role } from '../../../shared/enums';

describe('DoctorController', () => {
  let doctorController: DoctorController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let doctorService: DoctorService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [DoctorService],
    })
      .overrideProvider(DoctorService)
      .useValue(doctorServiceMock)
      .compile();

    doctorController = moduleRef.get<DoctorController>(DoctorController);
    doctorService = moduleRef.get<DoctorService>(DoctorService);
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      const result = await doctorController.getAll();
      expect(result).toEqual(mockDoctors);
    });
  });

  describe('findOne', () => {
    it('should return a doctor by id', async () => {
      const id = 1;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const doctor = mockDoctors.find((doctor) => doctor.id === id);

      const result = await doctorController.getOne(id);
      expect(result).toEqual(doctor);
    });
  });

  describe('update', () => {
    it('should update a doctor', async () => {
      const id = 1;
      const updatedDoctor = {
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

      const result = await doctorController.updateOne(id, updatedDoctor);
      expect(result).toEqual({ id, ...updatedDoctor });
    });
  });

  describe('delete', () => {
    it('should delete a doctor by id', async () => {
      const id = 1;

      const result = await doctorController.deleteOne(id);
      expect(result).toEqual({ deleted: true });
    });
  });
});
