const express = require('express');


//Controller
const { 
    createUser,
    login,
    updateUser, 
    deleteUser, 
    getUsersActive } = require('../controllers/users.controller');


//Middlewares

const { protectSession,protectUserAccount } = require('../middleware/auth.middleware');
const { createUserValidators } = require('../middleware/validators.middleware');
const { userExists } = require('../middleware/users.middlewares')

const usersRouter = express.Router();


usersRouter.post('/signup', createUserValidators, createUser); //Create User.

usersRouter.post('/login', login); //Login session.

usersRouter.use(protectSession);


usersRouter.get('/', getUsersActive); //get all list of user if you status is active.

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.patch(protectUserAccount, updateUser)
	.delete(protectUserAccount,deleteUser);

module.exports  = {  usersRouter };
