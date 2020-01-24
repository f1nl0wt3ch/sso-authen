const passport = require('passport'),
      router = require('express').Router(),
      User = require('../../model/UserModel')
      bcrypt = require('bcryptjs')


/*router.post('/auth/local/login', passport.authenticate('local', {
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

module.exports = router*/

/* post listing api router */
router.post('/auth/local/login', (req, res, next) => {
  const { username, password } = req.body
  console.log(`Request by form: ${JSON.stringify(req.body)}`)
  /*Match username or not*/
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      console.log(`Error: ${err}`)
      return next(err)
    }
    /* user not found */
    if (!user) {
      console.log(`User not matched!`)
      return next(null, false, {
        message: 'That email is not registered'
      })
    }
    /*Match password*/
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err
      if (isMatch) {
        return next(null, user)
      } else {
        return next(null, false, {
          message: 'Password incorrect'
        })
      }
    })

  })

})

module.exports = router