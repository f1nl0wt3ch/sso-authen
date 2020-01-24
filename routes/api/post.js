const router = require('express').Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth')

/*require hard coding data*/
const posts = require('../../controller/PostController').posts

/* post listing api router */
router.get('/api/posts', (req, res) => {
  //console.log(`All posts: ${JSON.stringify(posts)}`)
  res.json(posts)
})

module.exports = router
