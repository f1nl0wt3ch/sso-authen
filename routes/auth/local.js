const passport = require('passport')
const router = require('express').Router()
const User = require('../../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../config/key')

/* logout */
router.get('/auth/local/logout', (req, res, next) => {
  req.logOut()
  res.status(200).json({
    auth: false,
    token: null,
    msg: "Logout successfully."
  })
})

/* post listing api router */
router.post('/auth/local/login', (req, res, next) => {
   passport.authenticate('local', {
     session: false,
     successRedirect: '/dashboard',
     failureRedirect: '/login'
    }, (err, user, info) => {
      if(err || !user) return res.status(401).json({
         auth: false,
         msg: "Authentication failed",
         token: null
      }) 
      req.login(user, {session: false}, err => {
         if(err) res.send(err)
      })
      const token = jwt.sign(user.id, key.tokenSecret)
      return res.status(200).json({
        auth: true,
        msg: "Login successfully",
        token: token
      })
   })(req, res, next)
})



module.exports = router