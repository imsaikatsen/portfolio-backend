const jwt = require("jsonwebtoken");
exports.jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      req.userId = decodedToken.userId;
      next();
    });
  };
  
// module.exports = jwtMiddleware;