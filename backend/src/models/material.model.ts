import mongoose, { Document, Schema, model } from "mongoose";
import { productDocument } from "./product.model";

export interface materialInput {
  materialNumber: string;
  drawingNumber?: string;
  revision?: string;
  productId: productDocument["_id"];
}

export interface materialDocument extends materialInput, Document {}

const materialSchema = new Schema(
  {
    materialNumber: {
      type: String,
      required: true,
      unique: true,
    },
    drawingNumber: {
      type: String,
    },
    revision: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export default model<materialDocument>("Material", materialSchema);
