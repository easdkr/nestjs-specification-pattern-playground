import { Injectable } from '@nestjs/common';
import { CompositeSpecification } from '../../common/specification';
import { User } from '../entity/user.entity';
import { AdminEmailDomainSpecification } from './admin-email-domain.specification';
import { PasswordComplexitySpecification } from './password-complexity.specification';
import { UniqueNicknameSpecification } from './unique-nickname.specification';
import { UniqueEmailSpecification } from './unique-email.specification';
import { BannedEmailDomainSpecification } from './banned-email-domain.specification';

@Injectable()
export class UserCreationSpecification extends CompositeSpecification<User> {
  public constructor(
    private readonly bannedEmailDomainSpecification: BannedEmailDomainSpecification,
    private readonly adminEmailDomainSpecification: AdminEmailDomainSpecification,
    private readonly passwordComplexitySpecification: PasswordComplexitySpecification,
    private readonly uniqueNicknameSpecification: UniqueNicknameSpecification,
    private readonly uniqueEmailSpecification: UniqueEmailSpecification,
  ) {
    super();
  }

  public isSatisfiedBy(candidate: User): boolean | Promise<boolean> {
    return this.passwordComplexitySpecification
      .and(this.uniqueEmailSpecification)
      .and(this.uniqueNicknameSpecification)
      .and(this.adminEmailDomainSpecification)
      .and(this.bannedEmailDomainSpecification)
      .isSatisfiedBy(candidate);
  }
}
