/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { UserCreationSpecification } from './user-creation.specification';
import { BannedEmailDomainSpecification } from './banned-email-domain.specification';
import { AdminEmailDomainSpecification } from './admin-email-domain.specification';
import { PasswordComplexitySpecification } from './password-complexity.specification';
import { UniqueNicknameSpecification } from './unique-nickname.specification';
import { UniqueEmailSpecification } from './unique-email.specification';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from '../repository';
import { User } from '../entity/user.entity';
import { Role } from '../vo';
import { CoreException } from '../../common/exception';

describe('UserCreationSpecification', () => {
  let userCreationSpecification: UserCreationSpecification;
  const mockUserRepository = mockDeep<UserRepository>();

  beforeAll(async () => {
    // Create a module fixture for the testing context
    const module = await Test.createTestingModule({
      providers: [
        UserCreationSpecification,
        BannedEmailDomainSpecification,
        AdminEmailDomainSpecification,
        PasswordComplexitySpecification,
        UniqueNicknameSpecification,
        UniqueEmailSpecification,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    // Get the user creation specification
    userCreationSpecification = module.get(UserCreationSpecification);
  });

  describe('검증 모두 통과', () => {
    afterAll(() => {
      mockUserRepository.findOneByEmail.mockClear();
      mockUserRepository.findOneByNickname.mockClear();
    });

    it('어드민', async () => {
      // given
      const user = User.of({
        email: 'admin@june.io',
        nickname: 'admin',
        password: 'Admin1234!@',
        role: Role.ADMIN,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      mockUserRepository.findOneByNickname.mockResolvedValue(null);

      // when
      const received = await userCreationSpecification.isSatisfiedBy(user);

      // then
      expect(received).toBeTruthy();
    });

    it('일반 사용자', async () => {
      // given
      const user = User.of({
        email: 'admin@gmail.com',
        nickname: 'member',
        password: 'Member1234!@',
        role: Role.COMMON,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      mockUserRepository.findOneByNickname.mockResolvedValue(null);

      // when
      const received = await userCreationSpecification.isSatisfiedBy(user);

      // then
      expect(received).toBeTruthy();
    });
  });

  describe('검증 실패', () => {
    afterAll(() => {
      mockUserRepository.findOneByEmail.mockClear();
      mockUserRepository.findOneByNickname.mockClear();
    });

    it('비밀번호 복잡도', async () => {
      // given
      const user = User.of({
        email: 'awe@dubme.tm',
        nickname: 'member',
        password: '1234',
        role: Role.COMMON,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      mockUserRepository.findOneByNickname.mockResolvedValue(null);

      // when
      const received = () => userCreationSpecification.isSatisfiedBy(user);

      // then
      await expect(received).rejects.toThrow(CoreException);
    });

    it('이메일 중복', async () => {
      // given
      const user = User.of({
        email: 'pudujso@sok.rs',
        nickname: 'member',
        password: 'Member1234!@',
        role: Role.COMMON,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue({
        email: 'pudujso@sok.rs',
      } as User);
      mockUserRepository.findOneByNickname.mockResolvedValue(null);

      // when
      const received = () => userCreationSpecification.isSatisfiedBy(user);

      // then
      await expect(received).rejects.toThrow(CoreException);
    });

    it('닉네임 중복', async () => {
      // given
      const user = User.of({
        email: 'he@ifiew.be',
        nickname: 'member',
        password: 'Member1234!@',
        role: Role.COMMON,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      mockUserRepository.findOneByNickname.mockResolvedValue({
        nickname: 'member',
      } as User);

      // when
      const received = () => userCreationSpecification.isSatisfiedBy(user);

      // then
      await expect(received).rejects.toThrow(CoreException);
    });

    it('어드민 이메일 도메인', async () => {
      // given
      const user = User.of({
        email: 'lodde@ani.bb',
        nickname: 'admin',
        password: 'Admin123!@',
        role: Role.ADMIN,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      mockUserRepository.findOneByNickname.mockResolvedValue(null);

      // when
      const received = () => userCreationSpecification.isSatisfiedBy(user);

      // then
      await expect(received).rejects.toThrow(CoreException);
    });

    it('금지된 이메일 도메인', async () => {
      // given
      const user = User.of({
        email: 'banned@test.com',
        nickname: 'member',
        password: 'Member123',
        role: Role.COMMON,
      });

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      mockUserRepository.findOneByNickname.mockResolvedValue(null);

      // when
      const received = () => userCreationSpecification.isSatisfiedBy(user);

      // then
      await expect(received).rejects.toThrow(CoreException);
    });
  });
});
