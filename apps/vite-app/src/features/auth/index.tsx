import { useState } from "react";
import { SignupForm } from "./components/SignUpForm";
import { SigninForm } from "./components/SigninForm";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";

export default function Page() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      {/* Full-page Background */}
      <div className="absolute inset-0 w-full h-full bg-black z-0"></div>

      {/* Centered Trigger */}
      <div className="relative flex justify-center items-center h-screen z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-6 py-3 bg-button text-white rounded-lg hover:bg-button-hover shadow-md transition-all duration-300">Get Started</Button>
          </DialogTrigger>

          {/* Full-Screen Split Dialog */}
          <DialogContent autoFocus={false} forceMount className="w-full h-full max-w-none p-0 flex flex-col md:flex-row overflow-hidden">
            {/* Left Side: Background Image with Overlay */}
            <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('/auth.png')" }}>
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative text-center text-white px-12 flex flex-col justify-center items-center">
                <h2 className="text-5xl font-extrabold mb-4 leading-tight">Welcome Back!</h2>
                <p className="text-lg leading-relaxed text-gray-200">Join us and manage your portfolio seamlessly with modern tools designed just for you.</p>
              </div>
            </div>

            {/* Right Side: Forms */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-background px-6 py-8">
              <div className="w-full max-w-md">
                <DialogTitle className="sr-only">Create Your Account</DialogTitle>
                <DialogDescription className="sr-only">Complete the form to sign up for an account or switch to sign in.</DialogDescription>
                {isSignIn ? <SigninForm setIsSignIn={setIsSignIn} /> : <SignupForm setIsSignIn={setIsSignIn} />}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
