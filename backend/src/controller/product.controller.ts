import { Request, Response } from "express";
import { CreateProductInput } from "../schema/product.schema";
import {
  createProduct,
  findProductByName,
  findProducts,
} from "../service/product.service";
import logger from "../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    // check if product exist first
    const productExist = await findProductByName({
      productName: req.body.productName,
    });

    if (productExist) {
      return res.status(400).send("Product exist");
    }
    const product = await createProduct(req.body);
    return res.status(200).send(product);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}

export async function getProductsHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const products = await findProducts();
    return res.status(200).send(products);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
