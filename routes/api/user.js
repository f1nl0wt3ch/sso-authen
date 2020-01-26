const router = require('express').Router(),
      User = require('../../model/UserModel'),
      bcrypt = require('bcryptjs'),
      verifyToken = require('../../config/verify-token')
const { 
    capitalCase
} = require('change-case')


/* find all users from databases */
router.get('/api/users', verifyToken, (req, res, next) => {
    console.log(`User id: ${req.userid}`)
    User.find({}, (err, data) => {
        res.json(data)
    })
})

/* find user from database by username/email */
router.get('/user/:id', (req, res) => {
    res.send("Ok")
})

/* insert a new user */
router.post('/api/signup', (req, res) => {
    const {firstName, lastName, email, password} = req.body

    console.log(`Signup data: ${JSON.stringify(req.body)}`)
    User.findOne({email: email})
    .then(user => {
        /* if email found */
        if(user) {
            res.json({success: false, message: 'Sorry, this email was registered before!'})
        } else {
            const newUser = User({
                firstName: capitalCase(firstName),
                lastName: capitalCase(lastName),
                email: email,
                password: password
            })
           bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => {
                    res.json({success: true, message: 'Registration successfully!'})
                })
                .catch( err => {
                    console.log(`Registration failed: ${err}`)
                    res.json({success: false, message: 'Something went wrong, please try again later!'})
                })

            })
           })
        }
    })
})


module.exports = router
