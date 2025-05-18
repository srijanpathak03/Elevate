import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Check for token in cookies
  let token = req.cookies?.jwt;
  
  // If not in cookies, check Authorization header
  if (!token && req.headers.authorization) {
    // Format: "Bearer [token]"
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    return res.status(401).send("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(403).send("Token is not valid!");
    }

    req.userId = payload?.userId;
    next();
  });
};
