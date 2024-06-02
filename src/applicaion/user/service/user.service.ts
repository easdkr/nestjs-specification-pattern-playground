import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../core/user/repository';
import { UserCreationSpecification } from '../../../core/user/specification/user-creation.specification';
import { User } from '../../../core/user/entity/user.entity';
import { CoreException } from '../../../core/common/exception';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userCreationSpecification: UserCreationSpecification,
  ) {}

  public async create(user: User): Promise<User> {
    const satisfied = await this.userCreationSpecification.isSatisfiedBy(user);
    if (!satisfied) {
      throw new CoreException(
        'USER:UNKNOWN_CREATE_ERROR',
        'User creation failed',
      );
    }

    return await this.userRepository.save(user);
  }
}
