const passport = require('passport')
const router = require('express').Router()

// Dashboard
router.get('/api/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }))
router.post('/api/auth/google', passport.authenticate('google'))
router.get('/api/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }))

module.exports = router
