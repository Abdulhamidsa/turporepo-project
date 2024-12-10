import { Schema, model, Document } from "mongoose";
import professions from "@repo/data/constansts/professions.ts";
import links from "@repo/data/constansts/links.ts";
interface Link {
  name: string;
  url: string;
}
interface PersonalInfo {
  username: string;
  profilePicture?: string;
  bio?: string;
  profession?: keyof typeof professions; // Typed from preDefinedProfessions enum
  country?: string;
  links?: Link[];
}

// Define the main User document interface
export interface UserDocument extends Document {
  friendlyId: string;
  personalInfo?: PersonalInfo;
  userRole: string;
  approved: boolean;
  active: boolean;
  profilePicture?: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Personal Information Schema
const userPersonalInfoSchema = new Schema<PersonalInfo>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    profession: {
      type: String,
      enum: professions,
    },
    country: {
      type: String,
    },
    links: [
      {
        name: {
          type: String,
          trim: true,
          enum: links,
        },
        url: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { _id: false }
); // Prevent _id creation for this subdocument

// Main User Schema
const UserSchema = new Schema<UserDocument>(
  {
    friendlyId: {
      type: String,
      unique: true,
      required: true,
    },
    personalInfo: userPersonalInfoSchema,
    userRole: {
      type: String,
      default: "user",
    },
    approved: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Export the User model
export const User = model<UserDocument>("User", UserSchema);
