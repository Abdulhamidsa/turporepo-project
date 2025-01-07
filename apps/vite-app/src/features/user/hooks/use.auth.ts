import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { request } from "../../../../api/request";
import { getErrorMessage } from "../../../../api/errors"; // Adjust path as needed
import { createContext, useContext } from "react";
import { updateCredentialsSchema } from "@repo/zod/validation/auth";

type SignupResponse = {
  id: string;
  username: string;
};

type SignupPayload = {
  username: string;
  password: string;
};

const signupEndpoint = "/auth/signup";
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

const signinEndpoint = "/auth/signin";

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

  // SWR mutation to POST /auth/signin
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

// Fetch credentials hook

// Define the type for credentials
export type CredentialsType = {
  email: string;
  password: string;
};

// Hook to fetch credentials
export const useFetchCredentials = () => {
  const { data, error, mutate } = useSWR<CredentialsType | null>("/credentials", async (url: string) => {
    const response = await request<CredentialsType>("GET", url);
    if (!response) {
      throw new Error("No response received");
    }
    return response;
  });

  return {
    credentials: data || null, // Ensure data is null if undefined
    isLoading: !error && !data,
    error: error ? getErrorMessage(error) : null,
    mutate,
  };
};

// Update credentials hook
export type UpdateCredentialsPayload = {
  email?: string | undefined;
  password?: string | undefined;
};

export const useUpdateCredentials = () => {
  const mutationFetcher = async (url: string, { arg }: { arg: UpdateCredentialsPayload }) => {
    // Validate the payload before sending it to the API
    const validatedPayload = updateCredentialsSchema.parse(arg);

    const response = await request("PUT", url, validatedPayload);
    if (!response) {
      throw new Error("No response received");
    }
    return response;
  };

  const { trigger, isMutating, error } = useSWRMutation("/credentials", mutationFetcher);

  return {
    updateCredentials: trigger,
    isSubmitting: isMutating,
    error: error ? getErrorMessage(error) : null,
  };
};
