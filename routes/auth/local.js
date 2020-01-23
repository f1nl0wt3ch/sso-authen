const passport = require('passport');
const router = require('express').Router();

router.post('/api/auth/local', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}), (req, res, next) => {
    const {
      username,
      password
    } = req.body
    console.log(`Username: ${username} | Password: ${password}`)
    res.send("Check Login API called!")
  })

module.exports = router;
