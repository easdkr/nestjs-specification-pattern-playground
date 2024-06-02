import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../../../applicaion/user/service';
import { CreateUserRequest } from '../request';
import { CreateUserResponse } from '../response';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async create(
    @Body() body: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return await this.userService
      .create(body.toEntity())
      .then(CreateUserResponse.fromEntity);
  }
}
