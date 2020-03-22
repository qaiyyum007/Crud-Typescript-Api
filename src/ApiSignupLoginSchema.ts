import {check, validationResult} from 'express-validator'
import {Request,Response} from 'express'
export class Validator{
    static signupSchema() {
        return[
        check('name').not().isEmpty().withMessage('Invalid name'),
        check('email').isEmail().withMessage('Invalid Email'),
        check('password').isLength({ min: 5, max: 10 }).withMessage('Password should be between 5 to 10 characters long'),
        check('country').not().isEmpty().withMessage('Invalid country'),
        check('city').not().isEmpty().withMessage('Invalid city'),
        check('state').not().isEmpty().withMessage('Invalid state'),
        ]
    }

    static loginSchema() {
        return[
        
        check('email').isEmail().withMessage('Invalid Email'),
        check('password').isLength({ min: 5, max: 10 }).withMessage('Password should be between 5 to 10 characters long')
        ]
    }
    

   
    static ChangePasswordSchema() {
        return[
        check('password').isLength({ min: 5, max: 10 }).withMessage('Password should be between 5 to 10 characters long')
        ]
    }
    


    static handleError(req:Request,res:Response,next:Function){
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });

            }else
             next();

    }
}
