const router = require('express').Router()
const path = require('path')

/* post listing api router */
router.get('/', (req, res) => {
    res.sendFile('index.html',{root: path.join(__dirname, '../client/build/')})
})

/* dashboard */
router.get('/dashboard', (req, res) => {
    res.sendFile('index.html',{root: path.join(__dirname, '../client/build/')})
})

/* login */
router.get('/login', (req, res) => {
    res.sendFile('index.html',{root: path.join(__dirname, '../client/build/')})
})

/* signup */
router.get('/signup', (req, res) => {
    res.sendFile('index.html',{root: path.join(__dirname, '../client/build/')})
})

/* admin */
router.get('/admin', (req, res) => {
    res.sendFile('index.html',{root: path.join(__dirname, '../client/build/')})
})

module.exports = router