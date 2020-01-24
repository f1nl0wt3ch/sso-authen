const passport = require('passport')
const router = require('express').Router()


router.get('/api/auth/linkedin', passport.authenticate('linkedin'))
router.post('/api/auth/linkedin', passport.authenticate('linkedin'))
router.get('/api/auth/linkedin/callback',
passport.authenticate('linkedin', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }))

module.exports = router
