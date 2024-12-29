import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto py-16">{children}</main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-muted-foreground">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</footer>
    </div>
  );
}
