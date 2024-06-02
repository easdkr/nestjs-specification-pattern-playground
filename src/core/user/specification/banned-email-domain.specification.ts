import { Injectable } from '@nestjs/common';
import { CoreException } from '../../common/exception';
import { CompositeSpecification } from '../../common/specification';
import { User } from '../entity/user.entity';

@Injectable()
export class BannedEmailDomainSpecification extends CompositeSpecification<User> {
  private BANNED_DOMAINS = ['example.com', 'test.com'];
  public async isSatisfiedBy(candidate: User): Promise<boolean> {
    const domain = candidate.email.split('@')[1];

    if (this.BANNED_DOMAINS.includes(domain)) {
      throw new CoreException(
        'USER:BANNED_EMAIL_DOMAIN',
        'Banned email domain',
      );
    }

    return true;
  }
}
