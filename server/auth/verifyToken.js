const jwt = require('jsonwebtoken')


const authenticate = async (req, res, next) =>{
    // get token from headers
      const authToken = req.headers.authorization;

    // check if token exist
    if(!authToken || !authToken.trim().startsWith('Bearer')){
        return res.status(401).json({success:false,  message:"No token , authorization denied"})
    }

      const token = authToken.split(" ")[1];

    try {
        // console.log(authToken)
       // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded);
         // Attach decoded user to req
         req.user = decoded;
         req.userId = decoded.id 
         req.role = decoded.role
    
         next()
    } catch (err) {

        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({message:"Token is expired"})
        }
        return res.status(401).json({success:false, message:'Invalid Token' })
        
    }
}



module.exports = authenticate