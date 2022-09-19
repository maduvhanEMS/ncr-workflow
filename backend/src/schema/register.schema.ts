import { array, object, string, TypeOf, date } from "zod";

const workflow = object({
  name: string().optional(),
  department: string().optional(),
  status: string().optional(),
  updatedAt: date().optional(),
});

export const createRegisterSchema = object({
  body: object({
    project: string().optional(),
    productId: string({
      required_error: "ProductId is required",
    }),
    initiatorId: string().optional(),
    nonConformance: string({
      required_error: "ProductId is required",
    }),
    priorityLevel: string().optional(),
    status: string().optional(),
    plant: string({
      required_error: "plant is required",
    }),
    responsiblePerson: string({
      required_error: "responsible person is required",
    }),
    files: string().array().optional(),
    workflow: array(workflow),
  }),
});

export type createRegisterInput = TypeOf<typeof createRegisterSchema>;
