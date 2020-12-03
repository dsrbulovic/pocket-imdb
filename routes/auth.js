const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const  { registrationValidator } = require('../validators/auth/validators');
const { validationResult } = require('express-validator');

var jsonParser = bodyParser.json()
router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            req.login(
                user,
                { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id, email: user.email };
                    const access_token = jwt.sign({ user: body }, 'TOP_SECRET');

                    return res.json({ ...user, access_token });
                }
            );
            } catch (error) {
            return next(error);
            }
        }
        )(req, res, next);
    }
);

router.post(
    '/register',
    registrationValidator,
    jsonParser,
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(422).json(errors);
        }
        var user = User.create({email: req.body.email, password: req.body.password, name: req.body.name});
        res.json(user);
    }
);

module.exports = router;