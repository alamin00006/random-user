const jwt = require('jsonwebtoken');
function  verifyJWT(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'UnAthorized access'})
    }
    const token = authHeader.split(' ')[1];
   
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        console.log('decoded',decoded)
        if(err){
            
        return  res.status(403).send({message: "Forbidden access"})
        }
        req.decoded = decoded;
      
        next()
      });
    }
  module.exports = verifyJWT;
  