import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "config";

export interface InputInterface {
  email: String;
  name: String;
  password: String;
}

export interface UserDocument extends InputInterface, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: String): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified) {
    return next();
  }

  const salt = await bcrypt.genSaltSync(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default mongoose.model<UserDocument>("User", userSchema);
