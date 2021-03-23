import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  connectionUrl: 'mongodb://localhost:27017/Howdy'
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const config = {
  server: SERVER,
  mongo: MONGO_OPTIONS,
  apiVersion: 'v1',
  jwtSecret: 'group-scheduling-secret'
};

export default config;
