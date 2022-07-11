const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models

const { User } = require('../models/user.model');


//Utils 

const { catchAsync } = require('../utils/catchAsync.util');

const { AppError } = require('../utils/appError.util');

dotenv.config( {path: './config.env'} );

const protectSession = catchAsync(async (req, res, next) =>{
    let token;

    //Extract the token from headers
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith( 'Bearer')
    ){
        token = req.headers.authorization.split (' ')[1];
    }
    if (!token){
        return next(new AppError('invalid session', 403));
    }

    //Ask JWT (library), if the token still valid
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // { id, ...}

    //Chek in db that user still exits

    const user = await User.findAll({
        where:{id: decoded.id,status:'active'},
    });

    if (!user){
        return next(
            new AppError('the owner of this token doesnt exist anymore', 403)
        )
    }


    //Grant access
    req.sessionUser = user;
    next();

});

const protectUserAccount= (req, res, next) => {
    //const { id } = req.params  --> Alternative
    const { sessionUser, user} = req;


    //If the id's dont match return, error (403)
    if( sessionUser.id !== user.id){
        return next(new AppError('You do not own this account', 403));
    }

    next();
}





module.exports = {
    protectSession,
    protectUserAccount,
};