import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import CalendarSlot from '../models/calendarSlot';
import User from '../models/user';

const TIME_FORMAT = 'YYYY-MM-DD@HH:mm';

export default class CalendarSlotController {
  static async getSlots(req: Request, res: Response) {
    try {
      const calendarSlots = await CalendarSlot.find({ group: req.params.groupId }).exec();
      return res.status(200).json({
        data: calendarSlots
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  }

  static async saveOption(req: Request, res: Response) {
    try {
      const {
        body: { slotDateTime },
        params: { groupId }
      } = req;
      if (!slotDateTime || !slotDateTime.length) {
        throw new Error(`Slot time in format ${TIME_FORMAT} must be present in request body as slotDateTime key`);
      }

      // validate the slotDateTime
      const momentTime = moment(slotDateTime, TIME_FORMAT);
      if (!momentTime.isValid()) {
        throw new Error('Slot time is invalid');
      }
      // now check if minutes are either 0 or 30
      if (![0, 30].includes(momentTime.minutes())) {
        throw new Error('Slot time must be either the beginning of an hour or half an hour (0 or 30 mins).');
      }

      // get the user
      const user = await User.findOne({ email: res.locals.userEmail }).exec();
      if (!user) {
        throw new Error('User not found');
      }

      // check if current date time slot exists in CalendarSlot collection
      let existingSlotDateTime = await CalendarSlot.findOne({ dateTime: slotDateTime }).exec();
      if (!existingSlotDateTime) {
        // add
        const newCalendarSlot = new CalendarSlot({
          dateTime: slotDateTime,
          group: groupId,
          users: [user.id]
        });

        existingSlotDateTime = await newCalendarSlot.save();
      } else {
        // check if current user has already selected reserved this slot
        if (existingSlotDateTime.users.includes(user.id)) {
          throw new Error('You already booked this slot');
        }
        //check if there are already 30 participants
        if (existingSlotDateTime.count >= 30) {
          throw new Error('An event was already created');
        }
        existingSlotDateTime.users.push(user.id);
        await existingSlotDateTime.save();
      }

      return res.status(200).json({
        data: existingSlotDateTime
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  }
}
