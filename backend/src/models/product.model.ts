import mongoose from "mongoose";

export interface productInput {
  productName: string;
  specification: string;
}

export interface productDocument extends productInput, mongoose.Document {
  updatedAt: Date;
  createdAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    specification: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
