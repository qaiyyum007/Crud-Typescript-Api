"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
exports.app = app;
app.use(express.json());
app.listen(8383);
console.log('server is Start');
//# sourceMappingURL=App.js.map