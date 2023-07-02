import jwt from "jsonwebtoken";
import { jwtSecret } from '../env.dev.js';
import db from '../models/index.model.js';

const TokenModel = db.tokens;

const { verify } = jwt;

const authenticateMiddleware = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = verify(token, jwtSecret);
    if (!decodedToken) {
      return res.status(403).json({ error: 'Invalid Token.' });
    }

    const { id } = decodedToken;
    const tokenExists = await TokenModel.findOne({ where: { id } });

    if (!tokenExists) {
      return res.status(401).json({ error: 'Authentication failed.' });
    }

    req.user = { id };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};

export default authenticateMiddleware;