const router = require('express').Router(),
      User = require('../model/UserModel'),
      bcrypt = require('bcryptjs'),
      path = require('path')
const { 
    capitalCase
} = require('change-case')

/* post signup */
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

/* get signup */
router.get('/api/signup', (req, res) => {
    res.send("Ok")
})

module.exports = router