export type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profession: string;
  country: string;
};

export type SignupFormProps = {
  setIsSignIn: (isSignIn: boolean) => void;
};
