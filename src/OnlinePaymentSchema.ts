import {check} from 'express-validator';
import {Request,Response} from 'express'
import {  validationResult } from 'express-validator'

export class paymentSchema{

    static createOnlinepayment(){
        return [
            
                check('price')
                .notEmpty().withMessage('Money should not be empty'),
                 check('product')
                 .notEmpty().withMessage('Product should not be empty'),
        ]
    }
  
    static updatelinepayment(){
        return [
            check('product')
            .notEmpty().withMessage('Product should not be empty'),


                check('price')
                .notEmpty().withMessage('Money should not be empty'),
                
        ]
    }

    static handlesError(req:Request,res:Response,next:Function){
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });


            }else
             next();

    }
}



