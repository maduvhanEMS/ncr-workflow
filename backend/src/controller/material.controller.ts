import { Request, Response } from "express";
import { createMaterialInput } from "../schema/material.schema";
import {
  createMaterial,
  findMaterialByName,
  findMaterials,
} from "../service/material.service";
import logger from "../utils/logger";

export async function createMaterialHandler(
  req: Request<{}, {}, createMaterialInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    //check if materialExist
    const materialExist = await findMaterialByName({
      materialNumber: req.body.materialNumber,
    });

    if (materialExist) {
      return res.status(400).send("Material exist");
    }
    const material = await createMaterial(req.body);
    return res.status(200).send(material);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}

export async function getMaterialHandler(
  req: Request<{}, {}, {}>,
  res: Response
): Promise<Response> {
  try {
    const materials = await findMaterials();
    return res.status(200).send(materials);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
