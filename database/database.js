import { createRequire } from "module";
import { exit } from "process";
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const { builtinModules } = require('module');
const { NULL } = require('mysql/lib/protocol/constants/types');

import {connection} from '../main/connection.js';

connection.connect(function(err) {
        
        if(err) throw err;

        connection.query(`SET FOREIGN_KEY_CHECKS=0`, (err, result) => {
            if (err) throw err;
            console.log("Foreign Constraint Removed");
        })

        connection.query(`DROP DATABASE IF EXISTS cyber`, (err, result) => {
            if (err) throw err;
            console.log("Database dropped");
        })

        connection.query(`CREATE DATABASE cyber`, (err, result) => {
            if (err) throw err;
            console.log("Database created");
        })

        connection.query(`USE cyber`, (err, result) => {
            if (err) throw err;
            console.log("Database used");
        })

        connection.query(`CREATE TABLE user(
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        phone INT(10) NOT NULL,
        image VARCHAR(255) DEFAULT '0',
        password VARCHAR(20) NOT NULL,
        PRIMARY KEY(id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table user created");
            exit();
        })

    })
