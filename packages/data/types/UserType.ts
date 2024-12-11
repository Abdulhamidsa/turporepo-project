// import mongoose from "mongoose";
import Links from "../constansts/links.ts";
import Professions from "../constansts/professions.ts";

type ILink = {
  name: keyof typeof Links;
  url: string;
};
export type IUserProfile = {
  userInfo: IUser;
  userCredential: IUserCredential;
};
export type IUserCredential = {
  _id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
};
export type IPersonalInfo = {
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
  bio: string;
  profession?: typeof Professions;
  country: string;
  dateOfBirth: Date;
  links: ILink[];
};

export type IUser = {
  friendlyId: string;
  personalInfo: IPersonalInfo;
  userRole: string;
  approved: boolean;
  active: boolean;
  profilePicture: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
