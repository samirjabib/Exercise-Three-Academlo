
//Models
const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

//Utils

const userExists = catchAsync(async (req, res, next) =>{
    const { id } = req.params;

    const user = await User.findOne({
        where:{id, status:'active'}
    })

    if(!user) {
        return next(new AppError('User does not exist with given Id', 400));
    };


    //Add user data to the req object

    req.user = user;
    next()
});

module.exports = { userExists };