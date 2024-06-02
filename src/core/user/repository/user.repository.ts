import { User } from '../entity/user.entity';

export abstract class UserRepository {
  public abstract findOneByEmail(email: string): Promise<User | null>;
  public abstract findOneByNickname(nickname: string): Promise<User | null>;
  public abstract save(user: User): Promise<User>;
}
