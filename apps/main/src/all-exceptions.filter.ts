import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import Sequelize from 'sequelize';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (
      exception instanceof Sequelize.ValidationError ||
      exception instanceof Sequelize.DatabaseError ||
      exception instanceof Sequelize.ConnectionError ||
      exception instanceof Sequelize.ConnectionRefusedError ||
      exception instanceof Sequelize.ConnectionTimedOutError ||
      exception instanceof Sequelize.TimeoutError ||
      exception instanceof Sequelize.UniqueConstraintError ||
      exception instanceof Sequelize.ForeignKeyConstraintError
    ) {
      myResponseObj.statusCode = 422;
      myResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else if (exception instanceof Sequelize.EmptyResultError) {
      myResponseObj.statusCode = 404;
      myResponseObj.response = exception.message;
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = 'Internal Server Error';
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);

    super.catch(exception, host);
  }
}
