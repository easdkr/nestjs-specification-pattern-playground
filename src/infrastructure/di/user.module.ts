import { Module, Provider, Type } from '@nestjs/common';
import { UserRepository } from '../../core/user/repository';
import { AdminEmailDomainSpecification } from '../../core/user/specification/admin-email-domain.specification';
import { BannedEmailDomainSpecification } from '../../core/user/specification/banned-email-domain.specification';
import { PasswordComplexitySpecification } from '../../core/user/specification/password-complexity.specification';
import { UniqueEmailSpecification } from '../../core/user/specification/unique-email.specification';
import { UniqueNicknameSpecification } from '../../core/user/specification/unique-nickname.specification';
import { UserCreationSpecification } from '../../core/user/specification/user-creation.specification';
import { PrismaUserRepository } from '../repository/user';
import { UserService } from '../../applicaion/user/service';
import { UserController } from '../rest/user/controller';

const specifications: Provider[] = [
  AdminEmailDomainSpecification,
  BannedEmailDomainSpecification,
  PasswordComplexitySpecification,
  UniqueEmailSpecification,
  UniqueNicknameSpecification,
  UserCreationSpecification,
];

const repositories: Provider[] = [
  {
    provide: UserRepository,
    useClass: PrismaUserRepository,
  },
];

const services: Provider[] = [UserService];

const controllers: Type<any>[] = [UserController];

@Module({
  providers: [...specifications, ...repositories, ...services],
  controllers: [...controllers],
  exports: [],
})
export class UserModule {}
