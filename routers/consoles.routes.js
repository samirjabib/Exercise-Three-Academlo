const express = require('express');



//Controllers

const { 
    createConsole, 
    getAllConsoles,
    desactiveConsole,
    updateConsole,
} = require('../controllers/consoles.controller')


//Middlewares

const { protectSession} = require('../middleware/auth.middleware')



const consolesRouter = express.Router();


consolesRouter.post ('/', protectSession, createConsole) //Create game.

consolesRouter.get('/', getAllConsoles) //Get all consoles.

consolesRouter.patch('/:id', protectSession, updateConsole)  //Update title of console.

consolesRouter.delete('/:id', protectSession, desactiveConsole) //Disabled console. 



module.exports = { consolesRouter };