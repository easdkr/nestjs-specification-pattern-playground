import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CoreException } from '../../core/common/exception';
import { Response } from 'express';

@Catch(CoreException)
export class CoreExceptionFilter implements ExceptionFilter {
  public catch(exception: CoreException, host: ArgumentsHost): void {
    const logger = new Logger('CoreExceptionFilter');
    const response = host.switchToHttp().getResponse<Response>();
    const { code, message, stack } = exception;
    const status = this.toStatus(code);

    logger.error(`${code}: ${message}`, stack);

    response.status(status).json({
      code,
      message,
    });
  }

  // TODO: 애플리케이션 에러 코드 ENUM 으로 변경하기
  private toStatus(code: string): HttpStatus {
    switch (code) {
      case 'USER:UNKNOWN_CREATE_ERROR':
        return HttpStatus.INTERNAL_SERVER_ERROR;
      case 'USER:BANNED_EMAIL_DOMAIN':
        return HttpStatus.BAD_REQUEST;
      case 'USER:INVALID_PASSWORD':
        return HttpStatus.BAD_REQUEST;
      case 'USER:ALREADY_EXISTS':
        return HttpStatus.CONFLICT;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
