import mongoose, { Document, model, Schema } from "mongoose";
import { productDocument } from "./product.model";
import { UserDocument } from "./user.model";

export interface registerInput {
  project?: string;
  productId: productDocument["_id"];
  initiatorId: UserDocument["_id"];
  nonConformance: string;
  priorityLevel?: string;
  status?: string;
  plant: string;
  responsiblePerson: UserDocument["_id"];
  files?: Array<string>;
  workflow?: {
    name: string;
    department: string;
    status: string;
    updatedAt?: Date;
  }[];
}

export interface registerDocument extends registerInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const registerSchema = new Schema(
  {
    project: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    initiatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nonConformance: {
      type: String,
      required: true,
    },
    priorityLevel: {
      type: String,
      default: "low",
    },
    status: {
      type: String,
      default: "Initiated",
    },
    plant: {
      type: String,
    },
    responsiblePerson: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    files: {
      type: Array,
    },
    workflow: [
      {
        name: {
          type: String,
        },
        department: {
          type: String,
        },
        status: {
          type: String,
          default: "Not Started",
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<registerDocument>("Register", registerSchema);
