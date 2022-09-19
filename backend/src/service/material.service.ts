import { FilterQuery } from "mongoose";
import materialModel, {
  materialDocument,
  materialInput,
} from "../models/material.model";

export async function createMaterial(
  input: materialInput
): Promise<materialDocument> {
  return await materialModel.create(input);
}

export async function findMaterialByName(
  query: FilterQuery<materialDocument>
): Promise<materialDocument | void> {
  return await materialModel.findOne(query).lean();
}

export async function findMaterials(): Promise<materialDocument[]> {
  return materialModel.find().lean();
}
