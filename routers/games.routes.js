const express = require('express');


//Controller 
const { 
    createGame,
    desactiveGame,
    getAllGames,
    updateGame,
    makeReview,
    } = require('../controllers/games.controller');




const gamesRouter = express.Router();

//Middlewares

const { protectSession } = require('../middleware/auth.middleware');
const { gameExists } = require('../middleware/games.middlewares')

gamesRouter.post('/', protectSession, createGame); //Create Ggame

gamesRouter.get('/', getAllGames) // get all information of game

gamesRouter.post('/reviews/:gameId', makeReview) // Make a game review


gamesRouter.patch('/:id',protectSession, gameExists, updateGame) //Update Game
gamesRouter.delete('/:id', protectSession, gameExists, desactiveGame) //disabled game



module.exports = { gamesRouter };