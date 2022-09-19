import { TypeOf, string, object } from "zod";

export const createMaterialSchema = object({
  body: object({
    materialNumber: string({
      required_error: "Material number of requried",
    }).min(6, "Material number must be at least 6 chars"),
    drawingNumber: string({}),
    revision: string(),
    productId: string({
      required_error: "product id is required",
    }),
  }),
});

export type createMaterialInput = TypeOf<typeof createMaterialSchema>;
