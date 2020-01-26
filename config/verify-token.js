const jwt = require('jsonwebtoken')
      secret = require('./key').tokenSecret

 verifyToken = (req, res, next) => {
   const token = req.headers['x-access-token']
   if(!token)
      return res.status(403).json({auth: false, message: 'No token provided.'})
   jwt.verify(token, secret, (err, decoded) => {
       if(err) 
       return res.status(500).json({auth: false, message: 'Failed to authenticate token.'})
       //console.log(`${JSON.stringify(decoded)}`)
       req.userid = decoded.id
       next()
   })
}

module.exports = verifyToken