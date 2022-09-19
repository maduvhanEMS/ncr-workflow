import { TypeOf, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    productName: string({
      required_error: "Product is required",
    }),
    specification: string({
      required_error: "Product is required",
    }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
