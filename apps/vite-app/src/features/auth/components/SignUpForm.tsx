import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignup } from "../../user/hooks/use.auth";
import { SignUpFormData } from "@repo/data/types";
import { getErrorMessage } from "../../../../api/errors";
import { showToast } from "@repo/ui/components/ui/toaster";
import { AuthFormWrapper } from "./AuthFormWrapper";

export default function SignupForm({ setIsSignIn }: { setIsSignIn: (value: boolean) => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const { signup, isSubmitting } = useSignup();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await signup(data);
      showToast("You have successfully signed up.", "success");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showToast(errorMessage, "error");
    }
  };

  const password = watch("password");

  return (
    <AuthFormWrapper
      title="Create Your Account"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" onClick={() => setIsSignIn(true)}>
            Sign In
          </Button>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input className="border-border" type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
          {errors.email && (
            <p className="text-sm text-destructive-foreground mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input className="border-border" type="text" placeholder="Username" {...register("username", { required: "Username is required" })} />
          {errors.username && (
            <p className="text-sm text-destructive-foreground mt-1" role="alert">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <Input className="border-border" type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
          {errors.password && (
            <p className="text-sm text-destructive-foreground mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Input
            className="border-border"
            type="password"
            placeholder="Repeat Password"
            {...register("confirmPassword", {
              required: "Repeat Password is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive-foreground mt-1" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
