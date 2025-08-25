import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || 500;

    const errorResponse = exception.getResponse();
    const message = status < 500 ? (errorResponse as any).message : 'An unexpected error occurred';

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