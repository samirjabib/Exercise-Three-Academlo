//Models

const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
const { gamesInConsole} = require('../models/gamesInConsole.model')

//Utils

const { catchAsync } = require('../utils/catchAsync.util');

const createConsole = catchAsync(async (req, res, next ) => {
    const { name, company } = req.body;


    const newConsole = await Console.create({
        name,
        company,
    })

    res.status(201).json({
        status: ' success',
        newConsole,
    });
});


const getAllConsoles = catchAsync(async(req, res, next) => {

    const consoles = await Console.findAll({
        where: {status: 'active'},
        include:[{model:Game ,attributes:["title"]}]
    });

    res.status(200).json({
        status:'success',
        consoles
    });
});


const updateConsole = catchAsync(async(req, res, next) => {

    const { console } = req;
    const { name } = req.body;

    await console.update({ name });
    res.status(204).json({ status:'success'});
});


const desactiveConsole = catchAsync(async (req, res, next) => {

    const { console } = req;

    await console.update({ status: 'desactived'});
    res.status(204),json ({ status : 'success'});


})


module.exports = {
    createConsole,
    getAllConsoles,
    updateConsole,
    desactiveConsole,
}