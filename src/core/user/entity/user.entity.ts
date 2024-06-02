import { UNSET_ID } from '../../common/constant';
import { Role } from '../vo';

export class User {
  #id?: number;
  #email: string;
  #nickname: string;
  #password: string;
  #role: Role;

  private constructor(
    id: number,
    email: string,
    nickname: string,
    password: string,
    role: Role,
  ) {
    this.#id = id;
    this.#email = email;
    this.#nickname = nickname;
    this.#password = password;
    this.#role = role;
  }

  public static of(args: {
    email: string;
    nickname: string;
    password: string;
    role: Role;
  }): User {
    return new User(
      UNSET_ID,
      args.email,
      args.nickname,
      args.password,
      args.role,
    );
  }

  public static from(args: {
    id: number;
    email: string;
    nickname: string;
    password: string;
    role: Role;
  }): User {
    return new User(
      args.id,
      args.email,
      args.nickname,
      args.password,
      args.role,
    );
  }

  get id(): number {
    if (!this.#id) {
      throw new Error('Entity does not have an id');
    }

    return this.#id;
  }

  get email(): string {
    return this.#email;
  }

  get nickname(): string {
    return this.#nickname;
  }

  get password(): string {
    return this.#password;
  }

  get role(): Role {
    return this.#role;
  }
}
