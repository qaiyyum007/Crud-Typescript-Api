"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.signupSchema = function () {
        return [
            express_validator_1.check('name').not().isEmpty().withMessage('Invalid name'),
            express_validator_1.check('email').isEmail().withMessage('Invalid Email'),
            express_validator_1.check('password').isLength({ min: 5, max: 10 }).withMessage('Password should be between 5 to 10 characters long'),
            express_validator_1.check('country').not().isEmpty().withMessage('Invalid country'),
            express_validator_1.check('city').not().isEmpty().withMessage('Invalid city'),
            express_validator_1.check('state').not().isEmpty().withMessage('Invalid state'),
        ];
    };
    Validator.loginSchema = function () {
        return [
            express_validator_1.check('email').isEmail().withMessage('Invalid Email'),
            express_validator_1.check('password').isLength({ min: 5, max: 10 }).withMessage('Password should be between 5 to 10 characters long')
        ];
    };
    Validator.ChangePasswordSchema = function () {
        return [
            express_validator_1.check('password').isLength({ min: 5, max: 10 }).withMessage('Password should be between 5 to 10 characters long')
        ];
    };
    Validator.handleError = function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else
            next();
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=ApiSignupLoginSchema.js.map