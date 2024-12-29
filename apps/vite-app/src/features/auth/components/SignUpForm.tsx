import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@repo/hooks/use-toast";
import { useSignup } from "../../user/hooks/use.auth";
import { getErrorMessage } from "../../../utils/axiosConfige";

type FormData = {
  email: string;
  password: string;
};

type SignupFormProps = {
  setIsSignIn: (isSignIn: boolean) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ setIsSignIn }) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { signup, isSubmitting } = useSignup();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Submitting data:", data);
      await signup(data);
      toast({
        title: "Signup Successful",
        description: "You have successfully signed up.",
        variant: "success",
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
      toast({
        title: "Test Toast",
        description: "This is a test message.",
        variant: "success",
      });
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto rounded-xl bg-background p-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-white mb-7">Create an account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input placeholder="Email" {...register("email", { required: "Email is required" })} />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Input type="password" placeholder="Password" autoComplete="true" {...register("password", { required: "Password is required" })} />
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" disabled={isSubmitting} className="bg-button text-white hover:bg-button-hover transition-colors">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> : "Sign Up"}
            </Button>
            <div>
              <p className="text-sm">
                Already have an account?
                <Button variant="link" onClick={() => setIsSignIn(true)}>
                  Sign in
                </Button>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};
