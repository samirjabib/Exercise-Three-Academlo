const express = require('express');
const rateLimit = require('express-rate-limit')


//Routes

const { usersRouter } = require('./routers/users.routes');
const { consolesRouter } = require('./routers/consoles.routes');
const { gamesRouter } = require('./routers/games.routes');


//Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils

const { AppError }  = require('./utils/appError.util')




//Init app express
const app = express();



//Enable incoming JSON
app.use(express.json());

//Limit the number of request that be accepted to our server
const limiter = rateLimit({
    max:10000,
    windowMs : 40 * 40 * 1000,
    message: ' Number of request have been exceded'
});

app.use(limiter);


//Define endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use('/api/v1/games', gamesRouter);



//Handle incoming unknown routes to the server
app.all('*',(req, res, next) =>{
    next(
        new AppError(
            ` ${req.method} ${req.originalUrl} not found in this server`,
            404
        )
    );
});

app.use(globalErrorHandler);


module.exports = { app };