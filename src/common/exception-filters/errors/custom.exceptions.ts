import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

import { EnumModules } from '../../types';
import { THttpExceptionBody } from './http.exception.type';

export class ManageGlobalExceptions {
  path: string;

  error: string;

  details: string;

  status: number;

  timestamp?: Date;

  constructor(path: string, exception: unknown) {
    this.path = path;
    this.status = this.getStatusCode(exception);
    this.details = this.getErrorDetails(exception);
    this.error = this.getError(this.status);
    this.timestamp = new Date();
  }

  public getStatusCode<T>(exception: T): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (exception instanceof CustomDatabaseException) {
      return DBConstraints[exception.constraint]
        ? HttpStatus.UNPROCESSABLE_ENTITY
        : HttpStatus.INTERNAL_SERVER_ERROR;
    }
    if (exception instanceof CustomBusinessException) {
      return exception.httpCode || HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public getErrorDetails<T>(exception: T): string {
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as THttpExceptionBody;
      return Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message;
    }
    if (exception instanceof CustomDatabaseException) {
      return DBConstraints[exception.constraint] ?? '';
    }
    if (exception instanceof CustomBusinessException) {
      return exception.message;
    }
    return 'Internal Server Error';
  }

  public getError(status: number): string {
    return (
      {
        400: 'Bad Request',
        422: 'Unprocessable Entity',
        404: 'Not Found',
        401: 'Unauthorized',
        403: 'Forbidden',
        502: 'Bad GateWay',
        405: 'Method Not Allowed',
        409: 'Conflict',
      }[status] ?? 'Internal Server Error'
    );
  }
}

export class CustomException extends Error {
  entity: EnumModules;

  exception: unknown;

  constructor(message: string, entity: EnumModules, exception: unknown) {
    super(message);
    this.entity = entity;
    this.exception = exception;
  }
}

export class CustomDatabaseException extends CustomException {
  dbCode: string;

  constraint: string;

  constructor(message: string, entity: EnumModules, exception: unknown) {
    const { code, constraint } = exception as {
      code: string;
      constraint: string;
    };
    super(message, entity, exception);
    this.dbCode = code;
    this.constraint = constraint;
  }
}

export class CustomBusinessException extends CustomException {
  constructor(message: string, entity: EnumModules, public httpCode?: number) {
    super(message, entity, null);
  }
}

export const DBConstraintsKeys = {
  UC__USER__email: 'USER_email_key',
  FKC__USER__cityId: 'USER_cityId_fkey',
};

const DBConstraints: { [key: string]: string } = {
  [DBConstraintsKeys.UC__USER__email]: 'provided email already exist',
  [DBConstraintsKeys.FKC__USER__cityId]: 'provided cityId does not exist',
};