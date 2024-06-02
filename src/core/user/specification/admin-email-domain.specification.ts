import { CompositeSpecification } from '../../common/specification';
import { User } from '../entity/user.entity';
import { Role } from '../vo';
import { CoreException } from '../../common/exception';

export class AdminEmailDomainSpecification extends CompositeSpecification<User> {
  private readonly ADMIN_DOMAIN = 'june.io';
  public isSatisfiedBy(candidate: User): boolean {
    const domain = candidate.email.split('@')[1];

    if (candidate.role === Role.ADMIN && domain !== this.ADMIN_DOMAIN) {
      throw new CoreException(
        'USER:INVALID_ADMIN_EMAIL_DOMAIN',
        'Invalid admin email domain',
      );
    }

    return true;
  }
}
