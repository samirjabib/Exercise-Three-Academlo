const express = require('express');


//Controller
const { 
    createUser,
    login,
    updateUser, 
    desactiveUser, 
    getUsersActive } = require('../controllers/users.controller');


//Middlewares

const { protectSession,protectUserAccount } = require('../middleware/auth.middleware');
const { createUserValidators } = require('../middleware/validators.middleware');


const usersRouter = express.Router();


usersRouter.post('/signup', createUserValidators, createUser); //Create User.

usersRouter.post('/login', login); //Login session.

usersRouter.get('/', protectSession,getUsersActive); //get all list of user if you status is active.

usersRouter.patch('/:id', protectUserAccount, protectSession, updateUser) //Update User.

usersRouter.delete('/:id', protectUserAccount, protectSession, desactiveUser)   //Desactive User.


module.exports  = {  usersRouter };
