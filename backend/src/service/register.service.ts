import registerModel, {
  registerDocument,
  registerInput,
} from "../models/register.model";

export async function createRegister(
  input: registerInput
): Promise<registerDocument> {
  return await registerModel.create(input);
}

export async function getRegisters(): Promise<registerDocument[]> {
  return await registerModel
    .find()
    .populate({ path: "initiatorId", select: "name" })
    .populate({ path: "responsiblePerson", select: "name" });
}
