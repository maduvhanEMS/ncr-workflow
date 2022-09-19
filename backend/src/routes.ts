import { Express, Request, Response } from "express";
import {
  createMaterialHandler,
  getMaterialHandler,
} from "./controller/material.controller";
import {
  createProductHandler,
  getProductsHandler,
} from "./controller/product.controller";
import {
  createRegisterHandler,
  getRegistersHandler,
} from "./controller/register.controller";
import {
  createUserSessionhandler,
  deleteSessionHandler,
  getUserSessionshandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResouce from "./middleware/validateResource";
import { createMaterialSchema } from "./schema/material.schema";
import { createProductSchema } from "./schema/product.schema";
import { createRegisterSchema } from "./schema/register.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResouce(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResouce(createSessionSchema),
    createUserSessionhandler
  );

  app.get("/api/sessions", requireUser, getUserSessionshandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  //products routes
  app.post(
    "/api/products",
    validateResouce(createProductSchema),
    createProductHandler
  );

  app.get("/api/products", requireUser, getProductsHandler);

  //material routes
  app.post(
    "/api/materials",
    validateResouce(createMaterialSchema),
    createMaterialHandler
  );
  app.get("/api/materials", requireUser, getMaterialHandler);

  //ncrs
  app.post(
    "/api/registers",
    requireUser,
    validateResouce(createRegisterSchema),
    createRegisterHandler
  );
  app.get("/api/registers", requireUser, getRegistersHandler);
}

export default routes;
