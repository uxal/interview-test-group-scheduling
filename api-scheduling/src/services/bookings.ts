import { v4 as uuidv4 } from 'uuid';
import ical from 'ical-generator';
import Room from '../models/group';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import IBookingDetails from '../interfaces/IBookingDetails';

//@ts-ignore
const moment = extendMoment(Moment);

const createBooking = async (roomId: string, booking: IBookingDetails) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error(`Room not found for id ${roomId}`);
  }

  if (!validateBookingDetails(booking)) {
    throw new Error(`Booking payload object is not complete, check start, end dates and the booking owner.`);
  }

  const roomCalendar = room.calendar
    ? ical(JSON.parse(room.calendar))
    : ical({ name: `${room.name}-${roomId}`, prodId: { company: 'Befimmo', product: `${room.name}-${roomId}`, language: 'EN' } });

  const bookingStart = moment(booking.start);
  const bookingEnd = moment(booking.end);

  // validate the that start is before end
  if (bookingEnd.isSameOrBefore(bookingStart)) {
    throw new Error(`Booking's end time is before its start time.`);
  }

  const bookingRange = moment.range(bookingStart, bookingEnd);

  // now check if there is an empty slot where we can add the new booking
  roomCalendar.events().forEach((existingBooking) => {
    const existingBookingRange = moment.range(existingBooking.start(), existingBooking.end());
    if (bookingRange.overlaps(existingBookingRange)) {
      throw new Error(
        `The room is already booked between ${existingBooking.start().format('DD.MM.YYYY @ HH:mm')} - ${existingBooking.end().format('DD.MM.YYYY @ HH:mm')}.`
      );
    }
  });

  const bookingId = uuidv4();

  roomCalendar.createEvent({
    id: bookingId,
    uid: bookingId,
    start: bookingStart,
    end: bookingEnd,
    summary: booking.title,
    organizer: booking.owner
  });

  const json = roomCalendar.toJSON();

  room.calendar = JSON.stringify(json);
  await room.save();

  return room;
};

/**
 * TODO: This should be replaced with something like Joi
 */
const validateBookingDetails = (booking: any) => {
  return !(!booking.start || !booking.start.length || !booking.end || !booking.end.length || !booking.owner || !booking.owner.email.length);
};

export { createBooking };
