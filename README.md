# CyberNX_backend-assignment

## File Layout

### Client/
##### contains incomplete html files and JavaScript made for frontend

### database/
#### database.js   
##### contains queries for creating a new database

### main/
#### connection.js   
##### contains credentials for mysql server

#### app.js   
##### main JavaScript file

### pics/   
##### All pictures of the users will be stored here in the format : 'pic name'@'id of user'.png

### routes/
#### Users.js   
##### All the requests are processed here

### package.json
### package-lock.json


## Quick Start

### Creating a database
#### node database/database.js

### Starting the server
#### node main/app.js


## URLs for the server

### During registration
#### POST request to localhost:4000/register
#### Send 
#### First name as 'first_name'
#### Last name as 'last_name'
#### Password as 'password'
#### Phone no. as 'ph_no' and
#### Image file (PNG, JPG, JPEG) as 'image'.

#### Response will be 'message': 
##### message:1 = Successful 
##### message:0 = User already exists
##### message:-1 = Some/All credentials are missing


### During login
#### GET request to localhost:4000/login
#### Send First name (string) as 'first_name'
#### Last name (string) as 'last_name'
#### and Password (string) as 'password'
#### with "Content type = application/json"

#### Response will be id and/or message: 
##### message:1 = Successful, with 'data' inside of which there will be ID of user as 'id' which will be used in Display of Details/Image
##### message:0 = User doesn't exist
##### message:-1 = Some/All credentials are missing


### Display of information

#### Details
##### GET request to localhost:4000/display/details
##### Send id (INT) as 'id'

##### Response will be details and/or message:
###### message:1 = Successful, with 'data', imside which there will be First Name as 'first_name', Last Name as 'last_name', and Phone Number as 'ph_no'
###### message:0 = User doesn't exist
###### message:-1 = 'id' is not defined/sent

#### Image
##### GET request to localhost:4000/display/image
##### Send id (INT) as 'id'

##### Response will be image or message:
###### If successful, image will be sent
###### message:0 = User doesn't exist
###### message:-1 = 'id' is not defined/sent
