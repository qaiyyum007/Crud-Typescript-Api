import { Request, Response } from 'express';
export declare class Validator {
    static signupSchema(): import("express-validator").ValidationChain[];
    static loginSchema(): import("express-validator").ValidationChain[];
    static ChangePasswordSchema(): import("express-validator").ValidationChain[];
    static handleError(req: Request, res: Response, next: Function): void;
}
