# NodeJs-Authentication

This Node.js authentication project is structured for robustness and security. It leverages Express.js for efficient request handling, MongoDB for data storage, and Passport.js for streamlined authentication. Passport integrates JWT token and Google OAuth2 authentication seamlessly.

User routes manage signup, signin, and logout functionalities, while middleware ensures secure access to protected routes. Error handling middleware gracefully manages unexpected errors. Overall, the project exemplifies best practices in Node.js authentication with its structured approach and integration of essential libraries.

## Installation
To run this application on your local machine, please follow these steps:

Clone this repository using the following command:
```
$ git clone https://github.com/suranjit231/Nodejs_Auth-jwt-passwordjs-googleAuth.git
```
Install the required dependencies using the following command:
```
$ npm install 
```
Setup environment variable:

```
* CLIENT_ID

* CLIENT_SECRET

* JWT_SECRET

* DB_URL

```
Start the application using the following command:
```
$ npm start 
```
Open the application in your web browser by visiting the following URL:
```
$ http://localhost:3200 
```

## Usage
Once you have the application up and running, you can start using it by following these steps:
* Sing-up/Sign-in into your account.

* You can signin or signup by using normal credential or by your google credential

* When signin is successful it will redirected to protected page

* when signin is false it will redirect to signin page again with error message

* For logout click in logout button


## Folder Structure
```
Habit Tracker
       |             |                           |--->index.css
       |             |               |--->css--->|--->otpViews.css
       |             |--->public---->|           |
       |             |               |           |--->index.js    
       |             |               |--->js---> |--->login.js
       |             |                           |--->otpForm.js 
       |             |               |
       |             |               |--->config---->|--->mongodbConfig.js              
       |             |               |
       |             |               |               |                     |-->googleAuth.js
       |             |               |               |--->authentication-->|
       |             |               |--->feature--->|                     |-->jwt.middleware.js
       |             |               |               |                     |
       |             |               |               |
       |             |               |               |            |--->|otp.routes.js
       |             |               |               |--->otp --->|--->|otp.controller.js
       |             |               |               |            |--->|otp.repository.js
       |             |               |               |             
       |             |               |               |             
       |             |               |               |--->user--->|--->|->user.controller.js             
       |             |               |               |            |--->|->user.repository.js
       |             |---> src ----> |               |            |--->|->user.routes.js
       |             |               |               |            |--->|->userSchema.js
       |             |               |               
       |             |               |                |
       |-->backend-->|               |-->middleware-->|->errorHandlerMiddleware.js
       |             |               |                |
       |             |               |                
       |             |               |                |
       |             |               |-->utility ---> |->hashedPassword.js
       |             |               |                |
       |             |               |                
       |             |               |                
       |             |               |              
       |             |               |              |--->layout.ejs
       |             |               |              |--->otpForm.ejs
       |             |               |              |--->protectedView.ejs
       |             |               |--->views---->|--->resetPasswordForm.ejs
       |             |               |              |--->signin.ejs
       |             |                              |--->signup.ejs
       |             |--> node_modules              
       |             |--> .gitignore
       |             |--> server.js
       |             |--> package-lock.json
       |             |--> package.json
       |             |--> README.md
                     |--> .end




    
 ````
