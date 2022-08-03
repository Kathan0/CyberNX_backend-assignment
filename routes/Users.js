import { createRequire } from "module";
const require = createRequire(import.meta.url);
var path = require('path');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import connection from '../main/app.js';


const userRouter = express.Router();

const cors = require('cors');

userRouter
    .get('/login', cors(), loginUser)
    .get('/display/details', cors(), displayUser)
    .get('/display/image', cors(), displayImage)
    .post('/register',cors(), registerUser);

export function loginUser(req, res) {

    console.log(req);

    console.log(typeof req.body.first_name+" "+typeof req.body.last_name+" "+ typeof req.body.password+" "+req.body.first_name+" "+req.body.last_name+" "+req.body.password)

    if(typeof req.body.first_name !== 'undefined' && typeof req.body.last_name !== 'undefined' && typeof req.body.password !== 'undefined'){

        var first_name = `'${req.body.first_name}'`;
        var last_name = `'${req.body.last_name}'`;
        var password = `'${req.body.password}'`;

        connection.query(`USE cyber`, (err, result)=>{
            if(err) throw err;
            console.log("Database connected from GET /login");
        })

        connection.query(`SELECT u.id 
        FROM user u 
        WHERE u.first_name = ${first_name} 
        AND u.last_name = ${last_name} 
        AND u.password = ${password}`, (err, result)=>{
            if(err) throw err;

        if(result.length > 0){
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.send({
            data: resultArray[0],
            message: 1
        });
    } else {
            res.send({
                message: 0 //user doesnt exist
            })
        }
        })
    }
    else{
        console.log("Missed");
        res.json({
            message: -1 //missing info
        });
    }
} //Done

export function displayUser(req, res){

    if(typeof req.body.id !== 'undefined'){

        var id = req.body.id;
        connection.query(`USE cyber`, (err, result)=>{
            if(err) throw err;
            console.log("Database connected from GET /display/details");
        })
        connection.query(`SELECT u.first_name, u.last_name, u.phone
        FROM user u 
        WHERE u.id = ${id}`, (err, result)=>{
            if(err) throw err;
            
            if(result.length > 0){
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

            res.send({
                data: resultArray[0],
                message: 1
            });
        
        } else {
                res.send({
                    message: 0 //user doesnt exist
                })
            }
            })
        }else{
            res.json({
                message: -1 //missing info
            });
        }
} //Done

export function displayImage(req, res){

    if(typeof req.body.id !== 'undefined'){

        var id = req.body.id;

        connection.query(`USE cyber`, (err, result)=>{
            if(err) throw err
            console.log("Database connected from /display/image\n");
        })
        
        connection.query(`SELECT u.image
        FROM user u 
        WHERE u.id = ${id}`, (err, result)=>{
            if(err) throw err;
            
            if(result.length > 0){
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            var imageName = resultArray[0].image;

            console.log(`Image named: ${imageName} retrieved`);
            res.sendFile(path.join(__dirname, '../pics', imageName));
        
        } else {
                res.send({
                    message: 0 //user doesnt exist
                })
            }
        })
        }else{
            res.json({
                message: -1 //missing info
            });
        }
} //Done

export function registerUser(req, res) {

   if(typeof req.body.first_name !== 'undefined' && typeof req.body.last_name !== 'undefined' && typeof req.body.password !== 'undefined' && typeof req.files.image !== 'undefined'){

        var first_name = `'${req.body.first_name}'`;
        var last_name = `'${req.body.last_name}'`;
        var password = `'${req.body.password}'`;   
        var ph_no = req.body.ph_no;
        var ImageData = req.files.image;
        var imageName = ImageData.name.split(".")[0];

        var resultID = 0;

        if(999999999<ph_no<1000000000){

        //req.files.image.name

        connection.query(`USE cyber`, (err, result)=>{
            if(err) throw err;
            console.log("Database connected from /register\n");
        })

        connection.query(`SELECT *
        FROM user c
        WHERE c.first_name = ${first_name} AND
        c.last_name = ${last_name} AND
        c.password = ${password}`, (err, result)=>{
            if(err) throw err;

            if(result.length == 0){ //There is no user with same credentials

                connection.query(`INSERT INTO user(first_name, last_name, phone, password) 
                VALUES(${first_name}, 
                    ${last_name}, 
                    ${ph_no},
                    ${password})`, (err, result)=>{
                    if(err) throw err 
                    //Genertaes ID by auto increment

                    connection.query(`SELECT c.id 
                    FROM user c
                    WHERE c.first_name = ${first_name} AND
                    c.last_name = ${last_name} AND
                    c.password = ${password} AND
                    c.phone = ${ph_no}`, (err, result)=>{
                        if(err) throw err;

                        if(result.length>0) { // Just for security purpose

                            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                            resultID = resultArray[0].id;
                            imageName = imageName + "@" + resultID + ".png";
                            
                            connection.query(`UPDATE user SET image = '${imageName}' WHERE user.id = ${resultArray[0].id}`, (err, result)=>{
                                if(err) throw err

                                console.log(`Rows inserted with data: \nfirst_Name: ${first_name}\nlast_name: ${last_name}\npassword: ${password}\nphone: ${ph_no}\nimage name: ${imageName}`);
                                
                                const b64data = ImageData.data.toString('base64'); // Buffer -> base64     
                                require("fs").writeFile(path.join(__dirname, '../pics', imageName), b64data, 'base64', function(err) {
                                    console.log(err);
                                }); //base64 to image and save it in the folder

                                console.log(`Image saved on the path: CyberNX/pics/${imageName}\n`)

                                res.send({
                                    message: 1
                                })
                            })

                        }
                    })
                })

            } else {
                res.send({
                    message: 0 // User already exist;
                })
            }
       })


    }
    else {
        res.send({
            message: -1 // Invalid phone no;
        })
    }
    } else {
        res.send({
            message: -1 // Invalid credentials;
        })
    }


} //Done

export default userRouter;

