import { Request, Response } from 'express';
import Group from '../models/group';
import { createBooking } from '../services/bookings';

export default class RoomsController {
  static async get(req: Request, res: Response) {
    try {
      const groups = await Group.find().exec();
      return res.status(200).json({ data: groups });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error
      });
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const room = new Group({
        name
      });

      const createdRoom = await room.save();

      return res.status(201).json({
        data: createdRoom
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error
      });
    }
  }
}
