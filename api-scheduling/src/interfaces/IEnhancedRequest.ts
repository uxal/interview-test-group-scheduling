import { Request } from 'express';
import IUser from './IUser';

export default interface IEnhancedRequest extends Request {
  user?: IUser;
}
