import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { ManageGlobalExceptions } from './errors/custom.exceptions';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const customErrorResponse: ManageGlobalExceptions =
      new ManageGlobalExceptions(request.path, exception);

    return response
      .status(customErrorResponse.status)
      .json(customErrorResponse);
  }
}
