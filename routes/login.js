const router = require('express').Router(),
    passport = require('passport')

/* get */
/*router.get('/login', (req, res) => {
    res.send(path.join(__dirname = '../build/index.html'))
})*/
/* post listing api router */
router.post('/api/login', (req, res, next) => {
    const { username, password } = req.body
    console.log(`Login info: ${JSON.stringify(req.body)}`)
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res, next)
})

module.exports = router