import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface ResponseI {
  code?: number;
  data?: any;
  message?: any;
}

@Injectable({ scope: Scope.REQUEST })
export class Response {
  constructor(@Inject(REQUEST) private readonly req: Request = null) {}

  /**
   * Success Data Response
   * @param param0
   * @returns
   */
  async success({ code, data, message }: ResponseI) {
    this.req?.res && this.req.res.status(code ?? 200);
    return {
      statusCode: code ?? 200,
      message: message ?? '',
      data: data ?? [],
    };
  }

  /**
   * Error Data Response
   * @param param0
   * @returns
   */
  error({ code, data, message }: ResponseI) {
    this.req?.res && this.req.res.status(code ?? 500);
    return {
      statusCode: code,
      message,
      data,
    };
  }
}
