"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_validator_2 = require("express-validator");
var paymentSchema = /** @class */ (function () {
    function paymentSchema() {
    }
    paymentSchema.createOnlinepayment = function () {
        return [
            express_validator_1.check('Money')
                .notEmpty().withMessage('Money should not be empty'),
            express_validator_1.check('product')
                .notEmpty().withMessage('Product should not be empty'),
        ];
    };
    paymentSchema.handlesError = function (req, res, next) {
        var errors = express_validator_2.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else
            next();
    };
    return paymentSchema;
}());
exports.paymentSchema = paymentSchema;
//# sourceMappingURL=OnlinePaymentSchema.js.map