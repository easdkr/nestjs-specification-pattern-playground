import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from '../src/core/user/vo';
import { initializeApplication } from '../src/app.initializor';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initializeApplication(app);
    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  describe('POST /users', () => {
    afterAll(async () => {
      await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY CASCADE;`;
    });

    it('어드민 계정 생성', async () => {
      // given
      const req = {
        email: 'admin@june.io',
        nickname: 'admin',
        password: 'Admin1234!@',
        role: Role.ADMIN,
      };

      // when
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(req)
        .expect(201);

      // then
      expect(res.body).toEqual({
        id: expect.any(Number),
        email: 'admin@june.io',
        nickname: 'admin',
        role: 'ADMIN',
      });
    });

    it('일반 사용자 계정 생성', async () => {
      // given
      const req = {
        email: 'member@naver.com',
        nickname: 'member',
        password: 'Member123!@',
        role: Role.COMMON,
      };

      // when
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(req)
        .expect(201);

      // then
      expect(res.body).toEqual({
        id: expect.any(Number),
        email: 'member@naver.com',
        nickname: 'member',
        role: 'COMMON',
      });
    });
  });
});
