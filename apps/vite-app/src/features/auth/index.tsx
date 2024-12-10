import SignupForm from "./components/SignUpForm";
import SigninForm from "./components/SigninForm";
import { useState } from "react";

export default function Page() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <img src="/auth.png" alt="Full page background" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="h-screen z-10 relative flex flex-col items-center rounded-md py-10">{isSignIn ? <SigninForm /> : <SignupForm setIsSignIn={setIsSignIn} />}</div>
      {/* <div className="md:w-full bg-primary text-primary-foreground p-4 md:p-6 flex items-center justify-center">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold mb-4">{isSignIn ? "Welcome Back" : "Join Us Today"}</h1>
              <p className="text-base mb-4">{isSignIn ? "Sign in to access your own work and engage with other people with your same passion " : "Sign up to get started with our amazing features and services."}</p>
              <ul className="list-disc list-inside space-y-2 text-left">
                <li>Create your own portfolio</li>
                <li>Personalize your dashboard</li>
                <li>Connect with others that have the same passion</li>
              </ul>
            </div>
          </div> */}
    </>
  );
}
