import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Progress } from "@repo/ui/components/ui/progress";
import { Countries } from "@repo/data/constants/countries";
import Links from "@repo/data/constants/links";
import Professions from "@repo/data/constants/professions";
import { Loader2 } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  profession: string;
  country: string;
  links: { name: string; url: string }[];
};

type SignupFormProps = {
  setIsSignIn: (isSignIn: boolean) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ setIsSignIn }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const watchAllFields = watch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      console.log("Form submitted:", data);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input className=" " placeholder="First Name" {...register("firstName", { required: "First name is required" })} />
                {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Input placeholder="Last Name" {...register("lastName", { required: "Last name is required" })} />
                {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <Input placeholder="Username" {...register("username", { required: "Username is required" })} />
              {errors.username && <p className="text-sm text-destructive mt-1 ">{errors.username.message}</p>}
            </div>
            <div>
              <Input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input type="password" placeholder="Password" autoComplete="true" {...register("password", { required: "Password is required" })} />
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input placeholder="Profile Picture URL" {...register("profilePicture")} />
            <Textarea placeholder="Bio" {...register("bio")} className="min-h-[100px]" />
            <Controller
              name="profession"
              control={control}
              rules={{ required: "Profession is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent className="z-50 mt-1 max-h-40">
                    {Professions.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.profession && <p className="text-sm text-destructive mt-1">{errors.profession.message}</p>}
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="z-50 mt-1 max-h-40">
                    {Countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
            <div className="space-y-2">
              {Links.map((link, index) => (
                <div key={link} className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-fit">
                  <Input placeholder={`${link} URL`} {...register(`links.${index}.url`)} />
                  <Input value={link} readOnly {...register(`links.${index}.name`)} className="bg-muted" />
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Your Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className=" border border-input p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Personal Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400 text-sm">First Name:</p>
                      <p className="text-white truncate">{watchAllFields.firstName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Name:</p>
                      <p className="text-white truncate">{watchAllFields.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Username:</p>
                      <p className="text-white truncate">{watchAllFields.username}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-gray-400 text-sm">Email:</p>
                      <p className="text-white truncate">{watchAllFields.email}</p>
                    </div>
                  </div>
                </div>
                <div className=" border border-input p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Professional Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400 text-sm">Profession:</p>
                      <p className="text-white truncate">{watchAllFields.profession}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Country:</p>
                      <p className="text-white truncate">{watchAllFields.country}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className=" p-4 rounded-lg border border-input">
                  <h4 className="text-sm font-medium  text-gray-400 mb-2">Bio</h4>
                  <p className="text-white break-words">{watchAllFields.bio}</p>
                </div>
                <div className=" border border-input p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Links</h4>
                  <ul className="space-y-2">
                    {watchAllFields.links?.map((link, index) => (
                      <li key={index} className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-gray-400 text-sm">{link.name}:</span>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 truncate">
                          {link.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-xl bg-background p-2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-white mb-7">Create an account</CardTitle>
        <CardDescription className="text-center text-gray-400">Step {step} of 3</CardDescription>
        <Progress value={(step / 3) * 100} className="w-full mt-2 bg-primary" />
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-6">{renderStepContent()}</div>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-end">
          <div className=" flex items-center justify-between w-full mb-5">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={isSubmitting} className="border-gray-600 w-full max-w-28 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                Back
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting} className={cn(step === 1 && "w-full", " bg-button text-white hover:bg-button-hover w-full max-w-28 transition-colors self-center")}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> : null}
              {step < 3 ? "Next" : "Submit"}
            </Button>
          </div>
          <div className="mt-1 self-center text-center text-muted-foreground">
            <p className="text-sm inline-block">{"Already have an account?"}</p>
            <Button variant="link" className="p-0 h-auto underline ml-2" onClick={() => setIsSignIn(true)}>
              {"Sign in"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
