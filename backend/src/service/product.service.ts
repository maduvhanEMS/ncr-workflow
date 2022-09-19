import { FilterQuery } from "mongoose";
import productModel, {
  productDocument,
  productInput,
} from "../models/product.model";

export async function createProduct(input: productInput) {
  return await productModel.create(input);
}

export async function findProductByName(
  query: FilterQuery<productInput>
): Promise<productDocument | void> {
  return await productModel.findOne(query).lean();
}

export async function findProducts(): Promise<productDocument[]> {
  return await productModel.aggregate([
    {
      $lookup: {
        from: "materials",
        localField: "_id",
        foreignField: "productId",
        as: "materialNumber",
      },
    },
  ]);
}
