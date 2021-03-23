import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const authorizationRequired = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, config.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }
      const { email } = decoded as any;
      if (email) {
        res.locals.userEmail = email;
      }
      next();
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

export default authorizationRequired;
