import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignin } from "../../user/hooks/use.auth";
import { signInResolver } from "@repo/zod";
import { SignInFormData } from "@repo/data/types";
import { getErrorMessage } from "../../../../api/errors";
import { showToast } from "@repo/ui/components/ui/toaster";
import { AuthFormWrapper } from "./AuthFormWrapper";

export default function SigninForm({ setIsSignIn }: { setIsSignIn: (value: boolean) => void }) {
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
      showToast("You have successfully signed in.", "success");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showToast(errorMessage, "error");
    }
  };
  return (
    <AuthFormWrapper
      title="Sign In"
      footer={
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" onClick={() => setIsSignIn(false)}>
            Sign Up
          </Button>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input value="a@b.com" className="border-border" type="email" placeholder="email" {...register("email", { required: "email is required" })} />
          {errors.email && (
            <p className="text-sm text-destructive-foreground mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input value="password" className="border-border" type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
          {errors.password && (
            <p className="text-sm text-destructive-foreground mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
