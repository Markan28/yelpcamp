const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


// By using the storeReturnTo middleware function, we can save the returnTo value to res.locals before passport.authenticate()
// clears the session and deletes req.session.returnTo.
// This enables us to access and use the returnTo value (via res.locals.returnTo) later in the middleware chain so that we can redirect users to the appropriate page after they have logged in    


router.get('/logout', users.logout)

module.exports = router;