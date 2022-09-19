import { Response, Request } from "express";
import {
  createWorkflowInput,
  validateWorkflowInput,
} from "../schema/workflow.schema";
import { createWorkflow } from "../service/workflow.service";
import logger from "../utils/logger";

export async function createWorkflowHandler(
  req: Request<{}, {}, validateWorkflowInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    const workflow = await createWorkflow(req.body);
    return res.status(200).send(workflow);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
