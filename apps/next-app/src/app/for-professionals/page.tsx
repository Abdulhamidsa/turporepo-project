import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ForProfessionalsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">For Professionals</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-xl text-center mb-12">Showcase your talent, connect with clients, and grow your career with PortfolioShowcase.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Customizable profile page
              </p>
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Showcase your best projects
              </p>
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Highlight your skills and experience
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect and Grow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Network with other professionals
              </p>
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Get discovered by potential clients
              </p>
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Receive job opportunities
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg p-8 mt-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Ready to Showcase Your Talent?</h2>
          <p className="text-white text-center mb-6">Join thousands of professionals who are already benefiting from PortfolioShowcase.</p>
          <div className="text-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Create Your Account Now
            </Button>
          </div>
        </div>

        <div className="mt-12 space-y-8">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">1</span>
              <span>Sign up for a free account on our platform</span>
            </li>
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">2</span>
              <span>Create your profile and add your best projects</span>
            </li>
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">3</span>
              <span>Customize your portfolio page to reflect your personal brand</span>
            </li>
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">4</span>
              <span>Share your unique portfolio URL with potential clients and employers</span>
            </li>
          </ol>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
}
