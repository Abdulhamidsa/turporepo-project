import SignupForm from "../features/auth/components/SignUpForm";
import SigninForm from "../features/auth/components/SigninForm";
import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@repo/ui/components/ui/dialog";
import { Briefcase, Users, Palette, Rocket, Globe, Zap } from "lucide-react";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState<{
    mode: "signin" | "signup" | null;
    prefillValues?: { email?: string } | undefined;
  }>({
    mode: null,
  });

  const openSignUp = () => setIsSignIn({ mode: "signup" });

  const closeModal = () => setIsSignIn({ mode: null });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-muted to-background text-foreground">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-t from-background to-muted px-4 text-center">
        <img src="/hero-image.png" alt="Hero" className="absolute inset-0 object-cover w-full h-full opacity-30" />
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground max-w-4xl relative z-10">
          Build, Showcase, and Connect with <span className="text-primary">Professionals</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl relative z-10">Welcome to your ultimate portfolio builder. Create your professional presence, showcase your skills, and connect with a vibrant community.</p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
          <Button size="lg" className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground" onClick={openSignUp}>
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Choose Us?</h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground">Tools, community, and design to elevate your professional journey.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[Briefcase, Users, Palette, Rocket, Zap, Globe].map((Icon, index) => (
              <div key={index} className="flex flex-col items-center bg-card p-6 rounded-lg shadow-lg">
                <Icon className="text-primary w-10 h-10" />
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-foreground">{["Beautiful Portfolios", "Engaging Community", "Customizable Templates", "Built for Professionals", "Easy to Use", "Share Your Work"][index]}</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  {
                    [
                      "Showcase your skills with professionally designed templates.",
                      "Connect, collaborate, and grow with like-minded professionals.",
                      "Tailor your portfolio to match your personal brand.",
                      "Designed with you in mind, whether you're a developer, designer, or creator.",
                      "Create a stunning portfolio in minutes with our intuitive builder.",
                      "Publish your projects and get noticed by employers and peers.",
                    ][index]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto max-w-5xl text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Build Your Portfolio?</h2>
          <p className="mt-4 text-base sm:text-lg">Take your professional presence to the next level. It's free and easy to get started.</p>
          <div className="mt-8">
            <Button size="lg" className="px-8 py-3 bg-card text-primary" onClick={openSignUp}>
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PortConnect. All rights reserved.</p>
        </div>
      </footer>

      {/* Dialog for Forms */}
      <Dialog open={!!isSignIn.mode} onOpenChange={closeModal}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground p-6 rounded-lg shadow-lg z-50 w-[90%] sm:w-[400px]">
          <DialogHeader></DialogHeader>
          {isSignIn.mode === "signin" ? (
            <SigninForm setIsSignIn={(val) => setIsSignIn({ mode: val ? "signin" : "signup" })} prefillValues={isSignIn.prefillValues} />
          ) : (
            <SignupForm setIsSignIn={(val, prefill) => setIsSignIn({ mode: val ? "signin" : "signup", prefillValues: prefill })} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
