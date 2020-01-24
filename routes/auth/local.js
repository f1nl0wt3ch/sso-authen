const passport = require('passport'),
  router = require('express').Router(),
  User = require('../../model/UserModel'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  key = require('../../config/key')

/* logout */
router.get('/auth/local/logout', (req, res, next) => {
  res.status(200).json({
    auth: false,
    token: null,
    msg: "Logout successfully."
  })
})

/* post listing api router */
router.post('/auth/local/login', (req, res, next) => {
  const { username, password } = req.body
  //console.log(`Request by form: ${JSON.stringify(req.body)}`)
  /*Match username or not*/
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          auth: false,
          msg: 'Internal error please try again',
          token: null
        })
    } else if (!user) {
      /* user not found */
      res.status(401)
        .json({
          auth: false,
          msg: 'User not found',
          token: null
        })
    } else {
      /*Match password*/
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          const token = jwt.sign({id: user._id}, key.tokenSecret, {expiresIn: 10*60*1000})
          res.status(200)
            .json({
              auth: true,
              msg: "Login successfully.",
              token: token
            })
          next(err)
        } else {
          res.status(401)
            .json({
              auth: false,
              msg: "Password is incorrect.",
              token: null
            })
          next(err, isMatch)
        }
      })
    }
  })
})


module.exports = router