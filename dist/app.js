"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ApiLoginSignup_1 = require("./ApiLoginSignup");
var app = express();
exports.app = app;
var jwt = require("jsonwebtoken");
var OnlinePayment_1 = require("./OnlinePayment");
app.use(express.json());
app.listen(8383);
console.log('server is Start');
app.all("/api/*", function (req, res, next) {
    try {
        var token = req.headers["token"];
        console.log("token " + token);
        if (!token)
            res.status(403).send();
        else {
            jwt.verify(token, "secretKey", function (err, decoded) {
                if (!err)
                    next();
                else
                    res.status(500).send('token is not found');
            });
        }
    }
    catch (err) { }
});
app.use('/api/v1', new OnlinePayment_1.Payment().OnlineRouter);
app.use('/', new ApiLoginSignup_1.ApiLoginSignup().dataRouter);
//# sourceMappingURL=app.js.map