import { BookOpen } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border px-6 py-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
      <div className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
        <BookOpen className="h-5 w-5 text-primary" /> Inkflow
      </div>
      <p>© {new Date().getFullYear()} Inkflow. Made for writers, by writers.</p>
    </div>
  </footer>
);

export default Footer;
