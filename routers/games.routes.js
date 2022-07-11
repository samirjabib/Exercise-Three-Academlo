const express = require('express');


//Controller 
const { 
    createGame,
    desactiveGame,
    getAllGames,
    updateGame,
    } = require('../controllers/games.controller');




const gamesRouter = express.Router();

//Middlewares

const { protectSession } = require('../middleware/auth.middleware');

gamesRouter.post('/', protectSession, createGame); //Create Ggame

gamesRouter.get('/', getAllGames) // get all information of game

gamesRouter.post('/reviews/:gameId') // Make a game review


gamesRouter.patch('/:id',protectSession, updateGame) //Update Game
gamesRouter.delete('/:id', protectSession, desactiveGame) //disabled game



module.exports = { gamesRouter };