import jwt from "jsonwebtoken";
import { jwtSecret } from '../env.dev.js';

const { verify } = jwt;

const authenticateMiddleware = (req, res, next) => {
  console.log('aaaa');
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(400).json({ error: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = verify(token, jwtSecret);
    if (!decodedToken) {
      return res.status(403).json({ error: "Invalid Token." });
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Authentication failed." });
  }
};

export default authenticateMiddleware;