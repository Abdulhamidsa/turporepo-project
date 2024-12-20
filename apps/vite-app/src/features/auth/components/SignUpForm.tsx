import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import Professions from "@repo/data/constansts/professions";
import { FormData } from "@repo/data/types/FormTypes";
import { SignupFormProps } from "@repo/data/types/FormTypes";

export const SignupForm: React.FC<SignupFormProps> = ({ setIsSignIn }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none bg-background p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-white mb-4">Create an Account</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <Input placeholder="Username" {...register("username", { required: "Username is required" })} />
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}

          <Input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}

          <Input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}

          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}

          {errors.profession && <p className="text-sm text-destructive">{errors.profession.message}</p>}

          <Controller
            name="profession"
            control={control}
            rules={{ required: "Profession is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full text-white focus:ring">
                  <SelectValue placeholder="Select Profession" />
                </SelectTrigger>
                <SelectContent className=" rounded-md">
                  {Professions.map((profession) => (
                    <SelectItem key={profession} value={profession} className=" hover:bg-white hover:text-black focus:bg-gray-800 text-white cursor-pointer">
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {/* <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border-gray-700 text-white bg-gray-900 focus:ring focus:ring-blue-500">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent forceMount disablePortal className="bg-background border border-gray-700 rounded-md">
                  {Countries.map((country) => (
                    <SelectItem key={country} value={country} className="hover:bg-gray-800 focus:bg-gray-800 text-white px-4 py-2 cursor-pointer">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          /> */}

          {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-button text-white hover:bg-button-hover">
            Sign up
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Button variant="link" className="p-0 underline" onClick={() => setIsSignIn(true)}>
              Sign in
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};
