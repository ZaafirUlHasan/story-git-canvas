import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => (
  <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
    <div className="mx-auto max-w-6xl">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 font-body text-sm font-medium text-secondary-foreground">
            Version control, humanized
          </span>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl xl:text-7xl">
            Git for people who{" "}
            <span className="italic text-primary">write words</span>, not code
          </h1>
          <p className="mb-8 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
            Track every draft. Compare revisions side-by-side. Collaborate
            without fear. All the power of version control — none of the
            terminal commands.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2 rounded-full px-8 text-base font-medium">
              Start for free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-medium"
            >
              See how it works
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-primary/10">
            <img
              src={heroImage}
              alt="Illustration of a branching story tree with manuscript pages"
              className="w-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
