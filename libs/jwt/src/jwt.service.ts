import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export interface userRequest {
    user_id?: never;
    email?: string;
    role_id? : number;
}

@Injectable()
export class JwtService {
    constructor (@Inject(REQUEST) private readonly req: any) {}

    get user():userRequest {
        return this.req.user ?? {};
    }
}
