import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UserService } from '../../../../applicaion/user/service';
import { CreateUserRequest } from '../request';
import { CreateUserResponse } from '../response';
import { CoreExceptionFilter } from '../../../exception-filter';

@Controller('users')
@UseFilters(CoreExceptionFilter)
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
