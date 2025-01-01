import useSWRMutation from "swr/mutation";
import { request } from "../../../../api/request";
import { getErrorMessage } from "../../../../api/errors"; // Adjust path as needed
import { useAuth } from "../../../../context/AuthContext";

type SignupResponse = {
  id: string;
  username: string;
};

type SignupPayload = {
  username: string;
  password: string;
};

const signupEndpoint = "/public/signup";

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
