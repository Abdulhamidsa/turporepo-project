import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

type FormData = {
  email: string;
  password: string;
};

type SigninFormProps = {
  setIsSignIn: (isSignIn: boolean) => void;
};

export const SigninForm: React.FC<SigninFormProps> = ({ setIsSignIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Sign-in data:", data);
    // Simulate API call or validation logic
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none bg-background p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-white mb-4">Sign In</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}

          <Input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-button text-white hover:bg-button-hover">
            Sign In
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?
            <Button variant="link" className="p-0 underline" onClick={() => setIsSignIn(false)}>
              Sign up
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};
