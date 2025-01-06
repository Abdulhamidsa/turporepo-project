import useSWRMutation from "swr/mutation";
import { request } from "../../../../api/request";
import { getErrorMessage } from "../../../../api/errors"; // Adjust path as needed
import { createContext, useContext } from "react";

type SignupResponse = {
  id: string;
  username: string;
};

type SignupPayload = {
  username: string;
  password: string;
};

const signupEndpoint = "/public/signup";
type AuthContextType = {
  loggedUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};
type User = {
  friendlyId: string;
  username: string;
  profilePicture: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useSignup = () => {
  const mutationFetcher = async (url: string, { arg }: { arg: SignupPayload }) => {
    const response = await request<SignupResponse>("POST", url, arg);
    if (!response) {
      throw new Error("No response received");
    }
    return response;
  };

  const { trigger, isMutating, error } = useSWRMutation<SignupResponse, Error, string, SignupPayload>(signupEndpoint, mutationFetcher);

  return {
    signup: trigger,
    isSubmitting: isMutating,
    error: error ? getErrorMessage(error) : null,
  };
};
// signin hook

type SigninPayload = {
  email: string;
  password: string;
};

type SigninResponse = {
  success: string;
  data: {
    message: string;
  };
};

const signinEndpoint = "/public/signin";

// src/hooks/useSignin.ts

export const useSignin = () => {
  const { signIn } = useAuth();

  const mutationFetcher = async (url: string, { arg }: { arg: SigninPayload }) => {
    const response = await request<SigninResponse>("POST", url, arg);
    if (!response) {
      throw new Error("No response received");
    }
    return response;
  };

  // SWR mutation to POST /public/signin
  const { trigger, isMutating, error } = useSWRMutation<
    SigninResponse, // data shape
    Error, // error shape
    string, // key type
    SigninPayload // argument type
  >(signinEndpoint, mutationFetcher);

  const signin = async (payload: SigninPayload) => {
    // 1) Call the sign-in endpoint
    const response = await trigger(payload);
    if (response) {
      await signIn();
    }
    return response;
  };

  return {
    signin,
    isSubmitting: isMutating,
    error: error ? getErrorMessage(error) : null,
  };
};
