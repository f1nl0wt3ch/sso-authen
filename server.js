const path = require('path'),
      express = require('express'),
      cookieSession = require('cookie-session'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      flash = require('connect-flash'),
      mongoose = require('mongoose')
      key = require('./config/key.js')


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
app.use(express.static(path.join(__dirname, '/client/build')))

/* Setup session and cookies */
app.use(cookieSession({
   name: 'session',
   secret: 'secret',
   keys: ['cookie','session'],
   maxAge: 60*1000,
   path: "/",
   secure: false // a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS)
}))
app.use(passport.initialize())
app.use(passport.session())

// Connect to flash
app.use(flash())
// Global variables
app.use( (req, res, next) => {
   res.locals.success_msg = req.flash('success_msg')
   res.locals.error_msg = req.flash('error_msg')
   res.locals.error = req.flash('error')
   next()
})

// Call passport config
require('./config/passport')('facebook', passport)
require('./config/passport')('local', passport)
require('./config/passport')('linkedin', passport)
require('./config/passport')('google', passport)

// Routes
const indexRoute = require('./routes/index.js'),
      loginRoute = require('./routes/login.js'),
      signupRoute = require('./routes/signup.js'),
      postsRoute = require('./routes/posts.js'),
      facebookRoute = require('./routes/auth/facebook.js'),
      linkedinRoute = require('./routes/auth/linkedin.js'),
      localRoute = require('./routes/auth/local.js'),
      googleRoute = require('./routes/auth/google.js')
app.use(indexRoute)
app.use(signupRoute)
app.use(loginRoute)
app.use(postsRoute)
app.use(facebookRoute)
app.use(googleRoute)
app.use(linkedinRoute)
app.use(localRoute)

const PORT = process.env.SERVER_PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}!`)
})
