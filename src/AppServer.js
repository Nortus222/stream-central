"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var App_1 = require("./App");
dotenv.config();
var port = process.env.PORT;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
var mongoDBConnection = 'mongodb+srv://' + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);
var server = new App_1.App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);
