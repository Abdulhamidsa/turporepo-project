import { SignupForm } from "./components/SignUpForm";
import SigninForm from "./components/SigninForm";
import { useState } from "react";

export default function Page() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <img src="/auth.png" alt="Full page background" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="h-screen z-10 relative flex flex-col items-center rounded-md py-10">{isSignIn ? <SigninForm /> : <SignupForm setIsSignIn={setIsSignIn} />}</div>
    </>
  );
}
