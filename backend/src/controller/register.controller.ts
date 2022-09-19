import { Response, Request } from "express";

import { createRegisterInput } from "../schema/register.schema";
import { createRegister, getRegisters } from "../service/register.service";
import logger from "../utils/logger";

export async function createRegisterHandler(
  req: Request<{}, {}, createRegisterInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    // get the user
    const userId = res.locals.user._id;
    const ncr = await createRegister({ ...req.body, initiatorId: userId });
    return res.status(200).send(ncr);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}

export async function getRegistersHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const ncrs = await getRegisters();

    return res.status(400).send(ncrs);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
