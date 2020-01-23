const User = require('../model/UserModel')
const bcrypt = require('bcryptjs');
const key = require('./key')

module.exports = (service, passport) => {
    // For any request this configuration will check is user authenticated or not
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
      // User.findById(id, (err, user) => {
      //   done(err, user);
      // })
    })

  switch (service) {
    /*Configure for passport*/
    case "facebook":
      const FacebookStrategy = require('passport-facebook').Strategy;
      passport.use(new FacebookStrategy(key.facebookConfig,
        (accessToken, refreshToken, profile, done) => {
        done(null, profile)
      }))
      break;
      /*Configure for twitter*/
    case "twitter":
      const TwitterStrategy = require('passport-twitter').Strategy;

      passport.use(new TwitterStrategy(key.TwitterConfig,
        (token, tokenSecret, profile, done) => {
          User.findOrCreate({
            twitterId: profile.id
          }, function(err, user) {
            return cb(err, user);
          });
        }
      ));
      break;
    case "google":
      const GoogleStrategy = require('passport-google-oauth20').Strategy;

      passport.use(new GoogleStrategy(key.googleConfig,
        (accessToken, refreshToken, profile, done) => {
          done(null, profile)
        }
      ));
      break;
    case "linkedin":
      const LinkedInStrategy = require('passport-linkedin').Strategy;

      passport.use(new LinkedInStrategy(key.linkedinConfig,
        (token, tokenSecret, profile, done) => {
          /*User.findOrCreate({
            linkedinId: profile.id
          }, function(err, user) {
            return done(err, user);
          });*/
          done(null, profile)
        }
      ));
      break;
      /*Configureure for passport local*/
    default:
      const LocalStrategy = require('passport-local').Strategy;

      passport.use(new LocalStrategy({
        usernameField: 'email'
      }, (email, password, done) => {
        /*Match username or not*/
        User.findOne({
            email: email
          })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: 'That email is not registered'
              })
            }
            /*Match password*/
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user)
              } else {
                return done(null, false, {
                  message: 'Password incorrect'
                })
              }
            })
          })
      }
      ))
  }

}
