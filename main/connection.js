import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { builtinModules } = require('module');
const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345678"
});