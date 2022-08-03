import { createRequire } from "module";
const require = createRequire(import.meta.url);

import userRouter  from '../routes/Users.js'

import {connection} from './connection.js';

const express = require('express');
const port = 4000;
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const bodyParser = require('body-parser');

// application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', userRouter);

export default connection;

app.listen(port, (err, res) => {
    if (err) throw err
    console.log('server is listening on ' + port);
})