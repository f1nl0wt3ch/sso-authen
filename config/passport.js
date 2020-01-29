const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const key = require('./key')

module.exports = (service, passport) => {
  switch (service) {
    /*Configure for passport*/
    case "facebook":
      const FacebookStrategy = require('passport-facebook').Strategy
      passport.use(new FacebookStrategy(key.facebookConfig,
        (accessToken, refreshToken, profile, done) => {
          done(null, profile)
        }))
      break
    /*Configure for twitter*/
    case "twitter":
      const TwitterStrategy = require('passport-twitter').Strategy

      passport.use(new TwitterStrategy(key.TwitterConfig,
        (token, tokenSecret, profile, done) => {
          User.findOrCreate({
            twitterId: profile.id
          }, function (err, user) {
            return cb(err, user)
          })
        }
      ))
      break
    case "google":
      const GoogleStrategy = require('passport-google-oauth20').Strategy

      passport.use(new GoogleStrategy(key.googleConfig,
        (accessToken, refreshToken, profile, done) => {
          done(null, profile)
        }
      ))
      break
    case "linkedin":
      const LinkedInStrategy = require('passport-linkedin').Strategy

      passport.use(new LinkedInStrategy(key.linkedinConfig,
        (token, tokenSecret, profile, done) => {
          /*User.findOrCreate({
            linkedinId: profile.id
          }, function(err, user) {
            return done(err, user)
          })*/
          done(null, profile)
        }
      ))
      break
    /*Configureure for passport local*/
    default:
      const LocalStrategy = require('passport-local').Strategy
      const fieldOptions = {
        usernameField: 'username',
        passwordField: 'password'
      }
      const verifyCallBack = (username, password, done) => {
        console.log(`Login form: ${username}:${password}`)
        User.findOne({ email: username }, (err, user) => {
          /* Match username or not */
          if (err) {
            console.log(`Error: ${err}`)
            return done(err)
          }
          /* user not found */
          if (!user) {
            console.log(`User not matched!`)
            return done(null, false)
          }
          /*Match password*/
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })
        })

      }
      const localStrategy = new LocalStrategy(fieldOptions, verifyCallBack)
      passport.use(localStrategy)
  }
  // For any request this configuration will check is user authenticated or not
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => {
    //   done(err, user)
    // })
  })

}
