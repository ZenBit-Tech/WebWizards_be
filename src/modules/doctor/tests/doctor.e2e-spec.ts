/* eslint-disable no-magic-numbers */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { mockDoctors } from './doctor.mock';
import DoctorModule from '../doctor.module';
import Doctor from '../entity/doctor.entity';

describe('DoctorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        DoctorModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          database: ':memory:',
          dropSchema: true,
          entities: [Doctor],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const doctorRepository = moduleRef.get('DoctorRepository');
    await doctorRepository.save(mockDoctors);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/doctors (GET)', () => {
    it('should return an array of doctors', async () => {
      const response = await request(app.getHttpServer()).get('/doctors');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDoctors);
    });
  });

  describe('/doctors/:id (GET)', () => {
    it('should return a doctor by id', async () => {
      const id = 1;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const doctor = mockDoctors.find((doctor) => doctor.id === id);

      const response = await request(app.getHttpServer()).get(`/doctors/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(doctor);
    });

    it('should return a 404 error if doctor is not found', async () => {
      const id = 100;

      const response = await request(app.getHttpServer()).get(`/doctors/${id}`);
      expect(response.status).toBe(404);
    });
  });

  describe('/doctors/:id (PUT)', () => {
    it('should update a doctor by id', async () => {
      const id = 1;
      const doctorToUpdate = { name: 'Johnny Doe', speciality: 'Cardiology' };

      const response = await request(app.getHttpServer())
        .put(`/doctors/${id}`)
        .send(doctorToUpdate);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, ...doctorToUpdate });

      const doctorRepository = app.get('DoctorRepository');
      const updatedDoctor = await doctorRepository.findOne({ id });
      expect(updatedDoctor).toEqual({ id: 1, ...doctorToUpdate });
    });

    it('should return a 404 error if doctor is not found', async () => {
      const id = 100;
      const doctorToUpdate = { name: 'Johnny Doe', speciality: 'Cardiology' };

      const response = await request(app.getHttpServer())
        .put(`/doctors/${id}`)
        .send(doctorToUpdate);
      expect(response.status).toBe(404);
    });
  });

  describe('/doctors/:id (DELETE)', () => {
    it('should delete a doctor by id', async () => {
      const id = 1;

      const response = await request(app.getHttpServer()).delete(
        `/doctors/${id}`,
      );
      expect(response.status).toBe(200);

      const doctorRepository = app.get('DoctorRepository');
      const deletedDoctor = await doctorRepository.findOne({ id });
      expect(deletedDoctor).toBeUndefined();
    });

    it('should return a 404 error if doctor is not found', async () => {
      const id = 100;

      const response = await request(app.getHttpServer()).delete(
        `/doctors/${id}`,
      );
      expect(response.status).toBe(404);
    });
  });
});
