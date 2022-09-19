import mongoose from "mongoose";
import { Schema } from "zod";
import { UserDocument } from "./user.model";

export interface sessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  useAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<sessionDocument>("Session", sessionSchema);
