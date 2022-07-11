const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util')

const checkResult = ( req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMsgs = errors.array().map( err => err.msg);

        const message = errorMsgs.join('. ');
        
        return next(new AppError(message, 400));
    }

    next();

};


const createUserValidators = [
    body('name')
        .notEmpty()
        .withMessage('name cannot be empty'),
    body('email')
        .notEmpty()
        .withMessage('muest provide a valid email'),
    body( 'password')
        .isLength( { min : 8})
        .withMessage('password must be at least 8 characters long')
        .isAlphanumeric()
        .withMessage('password must contain letters and numbers'),
    checkResult,

]

module.exports = { createUserValidators };