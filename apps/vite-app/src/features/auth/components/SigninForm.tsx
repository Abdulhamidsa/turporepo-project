// import { Button } from "@repo/ui/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
// import { Input } from "@repo/ui/components/ui/input";
// // import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@repo/hooks/use-toast";
// import { useState } from "react";
// // import { useSignIn } from "@/hooks/useAuth";
// // import { signInSchema } from "@repo/lib/schemas/signInSchema";
// // import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";

// export type FormData = z.infer<typeof signInSchema>;
// export default function SigninForm() {
//   const { login } = useAuth();
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: zodResolver(signInSchema) });
//   const signIn = useSignIn();

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     setIsSubmitting(true);
//     const response = await signIn({ email: data.email, password: data.password });
//     if (response.result) {
//       toast({
//         title: "Success",
//         variant: "default",
//         description: response.message,
//         duration: 1500,
//       });
//       setTimeout(() => {
//         login();
//       }, 1500);
//     } else {
//       toast({
//         title: "Error",
//         description: response.message,
//         // variant: "destructive",
//         duration: 2000,
//       });
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <Card className="border-0 shadow-none w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Signin</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Input className="border-black/25" defaultValue="aboood@gmail.com" type="email" placeholder="Email" {...register("email")} aria-invalid={errors.email ? "true" : "false"} />
//             {/* {errors.email && (
//               <p className="text-sm text-red-500" role="alert">
//                 {errors.email.message}
//               </p>
//             )} */}
//           </div>
//           <div className="space-y-2">
//             <Input className="border-black/25" defaultValue="Aboood166" type="password" placeholder="Password" {...register("password")} aria-invalid={errors.password ? "true" : "false"} />
//             {/* {errors.password && (
//               <p className="text-sm text-red-500" role="alert">
//                 {errors.password.message}
//               </p>
//             )} */}
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Signing In..." : "Login"}
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }

function SigninForm() {
  return <div>SigninForm</div>;
}

export default SigninForm;
