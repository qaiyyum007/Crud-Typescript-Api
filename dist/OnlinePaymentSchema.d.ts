import { Request, Response } from 'express';
export declare class paymentSchema {
    static createOnlinepayment(): import("express-validator").ValidationChain[];
    static handlesError(req: Request, res: Response, next: Function): void;
}
