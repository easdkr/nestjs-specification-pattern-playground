import { Injectable } from '@nestjs/common';
import { CompositeSpecification } from '../../common/specification';
import { User } from '../entity/user.entity';
import { CoreException } from '../../common/exception';

@Injectable()
export class PasswordComplexitySpecification extends CompositeSpecification<User> {
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  public isSatisfiedBy(candidate: User): boolean {
    const isPasswordValid = this.passwordRegex.test(candidate.password);

    if (!isPasswordValid) {
      throw new CoreException('USER:INVALID_PASSWORD', 'Invalid password');
    }

    return isPasswordValid;
  }
}
