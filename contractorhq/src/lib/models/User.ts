// app/lib/models/User.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
},{ timestamps: true });

export default models.User || model<IUser>("User", UserSchema);
