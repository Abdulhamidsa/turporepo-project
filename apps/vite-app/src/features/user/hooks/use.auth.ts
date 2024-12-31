import useSWRMutation from "swr/mutation";
import { request } from "../../../../utils/axiosConfige";
import { getErrorMessage } from "../../../../utils/axiosConfige"; // Adjust path as needed

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
    const response = await request<SignupResponse, SignupPayload>("POST", url, arg);
    if (!response) {
      throw new Error("No response received");
    }
    return response;
  };

  const { trigger, isMutating, error } = useSWRMutation<SignupResponse, Error, string, SignupPayload>(signupEndpoint, mutationFetcher);

  return {
    signup: trigger,
    isSubmitting: isMutating,
    error: error ? getErrorMessage(error) : null, // Process error consistently
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

export const useSignin = () => {
  const mutationFetcher = async (url: string, { arg }: { arg: SigninPayload }) => {
    const response = await request<SigninResponse, SigninPayload>("POST", url, arg);
    if (!response) {
      throw new Error("No response received");
    }
    return response;
  };

  const { trigger, isMutating, error } = useSWRMutation<SigninResponse, Error, string, SigninPayload>(signinEndpoint, mutationFetcher);

  return {
    signin: trigger,
    isSubmitting: isMutating,
    error: error ? getErrorMessage(error) : null, // Process error consistently
  };
};
