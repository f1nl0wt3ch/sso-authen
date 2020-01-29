const path = require('path'),
  dotenv = require('dotenv'),
express = require('express'),
  cookieSession = require('cookie-session'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport'),
  flash = require('connect-flash'),
  mongoose = require('mongoose'),
key = require('./config/key.js')

dotenv.config()
const app = new express()

/*configure cors middleware*/
app.use(cors())
// Configure body parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}))
// Setup for passport and to accept JSON objects
app.use(express.json())

mongoose.connect(key.dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Database connected successfully!"))
  .catch(error => console.log(error))

// Serve static files from the React app
app.use('/static', express.static(path.join(__dirname, '/client/build/static')))
console.log(path.join(__dirname, '/client/build'))

app.use(cookieParser())

/* 
cookie-session is a simple / lightweight cookie-based. 
cookie is the only storage engine supported: all the session
info is stored on the client, in a cookie 
*/
/*app.use(cookieSession({
  name: 'session', // default is session
  secret: 'lutin', // A string which will be used as single key if keys is not provided
  cookie: {
    keys: ['key1', 'key2'],
    maxAge: 60 * 1000,
    path: "/", //a string indicating the path of the cookie (/ by default)
    secure: false, // a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS)
    signed: true, //a boolean indicating whether the cookie is to be signed (true by default)
    overwrite: true // a boolean indicating whether to overwrite previously set cookies of the same name (true by default)
  }
}))*/

app.use(session({
  secret: 'secretkey',
  key: 'skey.sid',
  resave: false,
  saveUninitialized: false,
  cookie : {
      maxAge: 604800000 //7 days in miliseconds
  }
}))

app.use(passport.initialize())
app.use(passport.session())

// Call passport config
require('./config/passport')('facebook', passport)
require('./config/passport')('local', passport)
require('./config/passport')('linkedin', passport)
require('./config/passport')('google', passport)

// Connect to flash
app.use(flash())
// Global variables
app.use((req, res, next) => {
  res.locals.msg = req.flash('msg')
  res.locals.auth = req.flash('auth')
  res.locals.token = req.flash('token')
  next()
})

// Routes
const clientRoute = require('./routes/client.js'),
  userApiRoute = require('./routes/api/user.js'),
  postApiRoute = require('./routes/api/post.js'),
  facebookAuthRoute = require('./routes/auth/facebook.js'),
  linkedinAuthRoute = require('./routes/auth/linkedin.js'),
  localAuthRoute = require('./routes/auth/local.js'),
  googleAuthRoute = require('./routes/auth/google.js')
app.use(clientRoute)
app.use(userApiRoute)
app.use(postApiRoute)
app.use(facebookAuthRoute)
app.use(googleAuthRoute)
app.use(linkedinAuthRoute)
app.use(localAuthRoute)

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}!`)
})
