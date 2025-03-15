const jwt = require("jsonwebtoken");

const authMiddleware ={
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if(token){
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken,process.env.JWT_SECRET, (err, user) => {
        if(err) {
          res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      })
    }else{
      res.status(401).json("You are not authenticated!");
    }
  },

  verifyTokenAndAdmin: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if(req.user.id === req.params.id || req.user.role === "admin"){
        next();
      }else{
        res.status(403).json("You are not allowed to do that!");
      }
    })
  }
}

module.exports = authMiddleware;