import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/core/user/entity/user.entity';
import { UserRepository } from 'src/core/user/repository';
import { Role } from 'src/core/user/vo';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user
      .findFirst({ where: { email } })
      .then(this.toEntity);
  }

  public async findOneByNickname(nickname: string): Promise<User> {
    return await this.prisma.user
      .findFirst({ where: { nickname } })
      .then(this.toEntity);
  }

  public async save(user: User): Promise<User> {
    return await this.prisma.user
      .create({
        data: {
          email: user.email,
          nickname: user.nickname,
          password: user.password,
          role: user.role,
        },
      })
      .then(this.toEntity);
  }

  private async toEntity(user: PrismaUser | null): Promise<User | null> {
    return user
      ? User.from({
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          password: user.password,
          role: Role[user.role],
        })
      : null;
  }
}
