import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BaseExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string | string[] | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message = (typeof errorResponse === 'object' && errorResponse !== null)
                ? (errorResponse as any).message
                : errorResponse;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';

      this.logger.error(`Unhandled Exception:`, exception instanceof Error ? exception.stack : exception);
    }

    response
      .status(status)
      .json({
        result: null,
        targetUrl: null,
        success: false,
        error: {
          code: status,
          message: Array.isArray(message) ? message[0] : message,
          details: null,
          validationErrors: null
        },
        unAuthorizedRequest: false,
        __abp: true
      });
  }
}