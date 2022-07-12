


//Models
const { Game } = require('../models/game.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');



const createGame = catchAsync(async (req, res, next) => {

	const { title, gender } = req.body;

	const newGame = await Game.create({
        title,
        gender,
	});


	res.status(201).json({
		status: 'success',
		newGame,
	});
});


const getAllGames = catchAsync(async(req, res, next) => {

    const games = await Game.findAll();

    res.status(200).json({
        status:'success',
        games
    })
});


const updateGame = catchAsync(async (res, req, next) => {
    const { game } = req;
    const { title } = req.body; 

    await game.update({ title })
    res.status(204).json({status:'success'});
});


const desactiveGame = catchAsync(async (res, req, next) => {
    const { game } = req;

    await game.update({ status: 'desactived'});

    res.status(204).json ({ status:'success'});
})

const gameReview = catchAsync(async (res, req, next) => {
    //Logic for create gameReview
})

module.exports = {
    createGame,
    getAllGames,
    updateGame,
    desactiveGame,
    gameReview,
}