import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@repo/ui/components/ui/dialog";

export default function Page() {
  const [isSignIn, setIsSignIn] = useState<"signin" | "signup" | null>("signin");

  const openSignIn = () => setIsSignIn("signin");
  const openSignUp = () => setIsSignIn("signup");

  return (
    <div className="relative h-[100dvh] w-full bg-gradient-to-br from-muted to-background text-foreground flex flex-col">
      {/* Header */}
      <header className="absolute top-4 right-4 z-20 flex space-x-4">
        <Button variant="ghost" onClick={openSignIn} className={`px-4 py-2 ${isSignIn === "signin" ? "underline text-primary" : "text-muted-foreground"}`}>
          Sign In
        </Button>
        <Button variant="ghost" onClick={openSignUp} className={`px-4 py-2 ${isSignIn === "signup" ? "underline text-primary" : "text-muted-foreground"}`}>
          Sign Up
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">Build Your Professional Portfolio</h1>
          <p className="mt-2 text-lg text-muted-foreground">Welcome to the ultimate portfolio builder! Showcase your skills, projects, and experience with ease.</p>
          <Button size="lg" onClick={openSignUp} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isSignIn && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsSignIn(null)} />}

      {/* Dialog for Forms */}
      <Dialog open={!!isSignIn} onOpenChange={() => setIsSignIn(null)}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground p-6 rounded-lg shadow-lg z-50 w-[90%] sm:w-[400px]">
          <DialogHeader></DialogHeader>
          {isSignIn === "signin" ? <SigninForm setIsSignIn={() => setIsSignIn("signup")} /> : <SignupForm setIsSignIn={() => setIsSignIn("signin")} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
