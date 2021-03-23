import mongoose, { Schema, Document } from 'mongoose';

export interface ICalendarSlot extends Document {
  dateTime: string;
  users: string[];
  group: string;
  count: number;
}

interface ICalendarSlotModel extends Document, ICalendarSlot {}

const CalendarSlotSchema: Schema = new Schema(
  {
    dateTime: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    group: { type: Schema.Types.ObjectId, ref: 'Group' }
  },
  {
    toJSON: { virtuals: true }
  }
);

CalendarSlotSchema.virtual('count').get(function (this: ICalendarSlotModel) {
  return this.users ? this.users.length : 0;
});

export default mongoose.model<ICalendarSlotModel>('CalendarSlot', CalendarSlotSchema);
