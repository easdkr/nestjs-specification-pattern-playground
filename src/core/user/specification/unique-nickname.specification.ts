import { CompositeSpecification } from '../../common/specification';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository';
import { CoreException } from '../../common/exception';

@Injectable()
export class UniqueNicknameSpecification extends CompositeSpecification<User> {
  public constructor(private userRepository: UserRepository) {
    super();
  }

  public async isSatisfiedBy(candidate: User): Promise<boolean> {
    const user = await this.userRepository.findOneByNickname(
      candidate.nickname,
    );

    if (!!user)
      throw new CoreException('USER:ALREADY_EXISTS', 'User already exists');

    return !user;
  }
}
