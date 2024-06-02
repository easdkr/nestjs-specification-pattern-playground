import { Injectable } from '@nestjs/common';
import { CompositeSpecification } from '../../common/specification';
import { UserRepository } from '../repository';
import { User } from '../entity/user.entity';
import { CoreException } from '../../common/exception';

@Injectable()
export class UniqueEmailSpecification extends CompositeSpecification<User> {
  constructor(private userRepository: UserRepository) {
    super();
  }

  public async isSatisfiedBy(candidate: User): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(candidate.email);

    if (!!user)
      throw new CoreException('USER:ALREADY_EXISTS', 'User already exists');

    return !user;
  }
}
