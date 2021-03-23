import http from 'http';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import { logger, LogLevel } from './config/logging';
import appRoutes from './routes';
import IEnhancedRequest from './interfaces/IEnhancedRequest';
import IUser from './interfaces/IUser';

const NAMESPACE = 'Server';
const router = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.connectionUrl)
  .then((result) => {
    logger(LogLevel.INFO, NAMESPACE, `Connected to Mongo!`);
  })
  .catch((error) => {
    logger(LogLevel.ERROR, NAMESPACE, error.message, error);
  });

/** Logging the request */
router.use((req, res, next) => {
  logger(LogLevel.INFO, NAMESPACE, `[REQUEST START] METHOD:[${req.method}], URL:[${req.url}], IP:[${req.socket.remoteAddress || 'N/A'}]`);

  res.on('finish', () => {
    logger(
      res.statusCode > 400 ? LogLevel.ERROR : LogLevel.INFO,
      NAMESPACE,
      `[REQUEST FINISH] METHOD:[${req.method}], URL:[${req.url}], IP:[${req.socket.remoteAddress || 'N/A'}], STATUS:[${res.statusCode}]`
    );
  });

  next();
});

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(cors());

/** Rules of API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //TODO: In production, limit the origin ips here
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

router.use((req: IEnhancedRequest, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode as IUser;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

/** Routes */
router.use(`/api/${config.apiVersion}/`, appRoutes);

/**  Error handling */
router.use((req, res, next) => {
  const error = new Error('Route not found');

  return res.status(404).json({
    message: error.message
  });
});

/**  Create the server*/
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logger(LogLevel.INFO, NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
