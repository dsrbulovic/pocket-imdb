const { body } = require('express-validator');


exports.registrationValidator = [
    body('email').isEmail().withMessage('Email you entered is invalid'), 
    body('password').notEmpty().isLength({ min:6 }).withMessage('Password must be at least 6 characters long'),
    body('password_confirmation').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match'),
    body('name').isLength({ min:3 }).withMessage('Name must be at least 3 characters long')
]