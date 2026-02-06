import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Navbar = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
        <BookOpen className="h-6 w-6 text-primary" />
        Inkflow
      </a>
      <div className="hidden items-center gap-8 font-body text-sm text-muted-foreground md:flex">
        <a href="#features" className="transition-colors hover:text-foreground">Features</a>
        <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
        <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
      </div>
      <Button size="sm" className="rounded-full px-6">
        Sign up
      </Button>
    </nav>
  </header>
);

export default Navbar;
