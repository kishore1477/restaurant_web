import express, { application } from "express";
import UserController from "../controllers/AuthController.js";
const Authrouter = express.Router()
// const expressValid = require('express-validator');
import Userauth from "../middleware/middlewareController.js";
Authrouter.use('/changePassword',Userauth)
Authrouter.use('/loggedUserData',Userauth)
// Public routes
Authrouter.post('/register', UserController.UserRegisteration)
Authrouter.post('/login', UserController.UserLogin)
Authrouter.post('/sendEmail', UserController.sendEmail)
Authrouter.post('/passwordReset/:id/:token', UserController.passwordReset)
// protected  routes
Authrouter.post('/changePassword', UserController.changePassword)
Authrouter.get('/loggedUserData', UserController.LoggedUserData)
Authrouter.post('/contact', UserController.Contact)


export default Authrouter