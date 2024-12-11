import mongoose, { Schema, Model } from "mongoose";
import { IUserCredential } from "@repo/data/types/UserType.ts";
const userCredentialSchema: Schema<IUserCredential> = new Schema({
  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    trim: true,
  },
});
export const Credential: Model<IUserCredential> = mongoose.model<IUserCredential>("Credential", userCredentialSchema);