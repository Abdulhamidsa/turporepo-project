import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignin } from "../../user/hooks/use.auth";
import { signInResolver } from "@repo/zod";
import { SignInFormData } from "@repo/data/types";
import { useToast } from "@repo/hooks/use-toast";
import { getErrorMessage } from "../../../utils/axiosConfige";

export default function SigninForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: signInResolver,
  });

  const { signin, isSubmitting } = useSignin();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await signin(data);
      toast({
        title: "Signin Successful",
        description: "You have successfully signed in.",
        variant: "success",
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast({
        title: "Signin Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-0 shadow-none w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input className="border-black/25" type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input className="border-black/25" type="password" placeholder="Password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Switch to Signup
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
