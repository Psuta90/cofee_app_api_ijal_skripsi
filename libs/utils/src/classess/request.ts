import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as Reqqq } from "express";

export interface userRequest {
    user_id?: never;
    email?: string;
    role_id?: number;

}

@Injectable({scope: Scope.REQUEST})
export class Request {
    constructor(@Inject(REQUEST) private req: Reqqq | any) { }
    /**
     * Get user information
     */
    get user(): userRequest {
        return this.req.user ?? {};
    }

    get origin() {
        const org: string = this.req.headers.origin;
        return org.replace("http://", "").replace("https://", "");
    }
}