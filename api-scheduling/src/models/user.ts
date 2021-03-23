import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    selectedSlots: [{ type: Schema.Types.ObjectId, ref: 'CalendarSlot' }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
