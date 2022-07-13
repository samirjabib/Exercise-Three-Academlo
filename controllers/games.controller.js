


//Models
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { protectSession } = require('../middleware/auth.middleware');


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

    const games = await Game.findAll({
        attributes:["title","gender", "id"],
        where:{ status: 'active'},
        include: { model: Console, attributes:[ "name", "company"]},
        include:{model: {Review}, attributes:["comment"]},
    });

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

    console.log(game)
    await game.update({ status: 'desactived'});

    res.status(204).json ({ status:'success'});
})

const makeReview = catchAsync(async (res, req, next) => {
    
    const { comment } = req

    const { gameId } = req.params;

    const { user } = req;
    

    const newReview = await Review.create({
        comment,
        gameId,
        userId: user.id
    })


    res.status(200).json({
        status:"success",
        newReview
    })

})

module.exports = {
    createGame,
    getAllGames,
    updateGame,
    desactiveGame,
    makeReview,
}