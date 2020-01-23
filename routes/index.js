const router = require('express').Router()
const path = require('path')

/* post listing api router */
router.get('/', (req, res) => {
    res.send(path.join(__dirname = '/client/build/index.html'))
})

/* dashboard */
/*router.get('/dashboard', (req, res) => {
    res.send(path.join(__dirname = '../build/index.html'))
})*/

module.exports = router