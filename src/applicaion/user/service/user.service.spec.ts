import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserCreationSpecification } from '../../../core/user/specification/user-creation.specification';
import { UserRepository } from '../../../core/user/repository';
import { User } from '../../../core/user/entity/user.entity';
import { CoreException } from '../../../core/common/exception';

describe('UserService', () => {
  let service: UserService;
  const mockUserCreationSpecification = {
    isSatisfiedBy: jest.fn(),
  };
  const mockUserRepository = {
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserCreationSpecification,
          useValue: mockUserCreationSpecification,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('유저 생성 성공', async () => {
      // given
      const user = { id: 1, name: 'test' } as unknown as User;
      mockUserCreationSpecification.isSatisfiedBy.mockResolvedValue(true);
      mockUserRepository.save.mockResolvedValue(user);

      // when
      const received = await service.create(user);

      // then
      expect(received).toEqual(user);
    });

    it('should throw an exception when user creation failed', async () => {
      // given
      const user = { id: 1, name: 'test' } as unknown as User;
      mockUserCreationSpecification.isSatisfiedBy.mockResolvedValue(false);

      // when
      const received = () => service.create(user);

      // then
      await expect(received).rejects.toThrow(CoreException);
    });
  });
});
