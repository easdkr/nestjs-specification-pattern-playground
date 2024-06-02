import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { User } from '../../../../core/user/entity/user.entity';
import { Role } from '../../../../core/user/vo';

export class CreateUserRequest {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(3, 20)
  public nickname: string;

  @IsString()
  @Length(8, 20)
  public password: string;

  @IsEnum(Role)
  public role: Role;

  @Exclude()
  public toEntity(): User {
    return User.of({
      email: this.email,
      nickname: this.nickname,
      password: this.password,
      role: this.role,
    });
  }
}
