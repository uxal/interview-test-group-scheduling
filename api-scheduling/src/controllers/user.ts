import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/config';

export default class UserController {
  static generateToken(email: string) {
    return new Promise((resolve, reject) => {
      jwt.sign({ email }, config.jwtSecret, (error: any, token: any) => {
        if (error) {
          reject(Error(error.message));
        }
        resolve(token);
      });
    });
  }

  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: 'User with this email is already registered'
        });
      }
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(password, 10);

      await newUser.save();
      const token = await UserController.generateToken(email);

      return res.status(201).json({
        token: token
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error
      });
    }
  }

  static async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
      });

      const token = await UserController.generateToken(email);
      return res.status(200).json({
        token
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error
      });
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: res.locals.userEmail }).select('-password').exec();
      if (!user) {
        throw new Error('User not found');
      }
      return res.status(200).json({
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error
      });
    }
  }
}
