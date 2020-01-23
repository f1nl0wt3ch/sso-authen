const passport = require('passport')
const router = require('express').Router();

// Dashboard
router.post('/api/auth/facebook', passport.authenticate('facebook'));
router.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', {
    scope:  ['user_friends', 'manage_pages'],
    failureRedirect: '/login',
    session: true /* false == we don't use session, default is true */,
    successRedirect: '/dashboard'
  }));

module.exports = router;
