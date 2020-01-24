const User = require('../model/UserModel'),
    router = require('express').Router()

router.get('/api/users', (req, res) => {
    User.find({}, (err, data) => {
        res.json(data)
    })
})
module.exports = router
