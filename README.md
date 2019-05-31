# User Authentication

## [Live Demo](https://auth-app.digital-logic.net/)

* Front-end: React, Redux, Redux-Form, Redux-Thunk, Material-ui, casl
* Back-end: Express, Mongo / Mongoose, Casl, JWT, Node-Mailer
    * [Source Code](https://github.com/Digital-Logic/express-hmr)

## Provides:

sign-in, sign-up, password-reset, email address verification, profile page, update and delete  user accounts.

* Access Control: role-based access control at the route level, and at a per-field level within views.
* Social media login support through facebook and google.
* Authentication: json web tokens are stored in httpOnly cookies
    * access tokens - short lived jwt
    * refresh tokens - long lived jwt are used to acquire a new access token
    * email tokens - used to validate email address and reset a users password
