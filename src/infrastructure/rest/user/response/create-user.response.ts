import { User } from '../../../../core/user/entity/user.entity';

export class CreateUserResponse {
  public id: number;
  public email: string;
  public nickname: string;
  public role: string;

  public static fromEntity(user: User): CreateUserResponse {
    const response = new CreateUserResponse();
    response.id = user.id;
    response.email = user.email;
    response.nickname = user.nickname;
    response.role = user.role;

    return response;
  }
}
