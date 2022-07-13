//Reviews
const { Review } = require('../models/review.model');


//Utils 

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const reviewExists = catchAsync( async(req, res, next) => {

    const { id } = req.params;

    const review = await Review.findOne( { where: { id} });

    if(!comment){
        return next(new AppError('Comment not found', 404));
    };


    req.review= review;

    next();



})


module.exports = { reviewExists };