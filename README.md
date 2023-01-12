# AutoEx


## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Technology](#technology)
- [Features](#features)
- [Run&nbsp;Backend](#runbackend)
- [Run&nbsp;Client&nbsp;Side](#runclientside)


## Introduction

A web-based automobile consultation platform usingthe MERN stack, this platform provides details,news, reviews, and communities related toautomobiles (currently concentrated on cars and
bikes) and allows users to interact with automobile experts.


NOTE: Please read the RUN section before opening an issue.
>Warning: AutoEx is still in development, constantly being optimized and isn't still stable enough to be used in production environments
## Demo
![This is an image](/Autoexhome.jpg)




![This is an image](/autoexlogin.jpg)

A web-based automobile consultation platform usingthe MERN stack, this platform provides details,news, reviews, and communities related toautomobiles (currently concentrated on cars and
bikes) and allows users to interact with automobile experts.


## Technology

The application is built with:

- React.js
- Redux
- Node.js
- MongoDB
- Express
- Tailwind
- Material UI
- Ant Design
- Socket.IO
- Nodemailer
- Stripe


## Features

- SignUp, and log in With the JWT token, OTP verification
- Admin Page, Block User, approve expert,Block expert
- Create, Edit, Delete Vehicles
- Live Chat, Integrated with Socket I/O
- Book session with expert
- Payment using stripe 


## Run&nbsp;Backend

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- MONGO_URI : This is the MongoDB Connection Url (string).

- JWT_SECRET : This is the JWT SECRET ID (string).

- BASE_URL: This is the Base URL of Website (string).

- PORT: Specify the port Number

- Nodemailer : ID,Client secret etc..

- Also you need to insert admin username and password in database eg:{username:"admin",password:"12345"}

After you've set these environmental variables in the .env file at the root of the project, and intsall node modules using npm install

Now you can run npm start in the terminal and the application should work.


## Run&nbsp;Client&nbsp;Side

intsall node modules using npm install

Now you can run npm run dev in the terminal and the Client Side should start working.

## Copyright

Copyright 2023 © [Akhil M](https://github.com/Akhilmkvkl)
