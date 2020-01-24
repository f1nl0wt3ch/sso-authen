const router = require('express').Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth')
const verifyToken = require('../../config/verify-token')

/*require hard coding data*/
const posts = require('../../fakeapi/data').posts

/* post listing api router */
router.get('/api/posts', verifyToken, (req, res, next) => {
  res.json(posts)
})

module.exports = router
