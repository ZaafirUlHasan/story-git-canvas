import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => (
  <section className="px-6 py-24 lg:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-3xl rounded-3xl bg-foreground px-8 py-16 text-center text-background shadow-2xl lg:px-16"
    >
      <h2 className="mb-4 font-display text-4xl font-bold lg:text-5xl">
        Your words deserve a safety net
      </h2>
      <p className="mx-auto mb-8 max-w-xl font-body text-lg opacity-80">
        Join thousands of writers who never lose a draft again. Free for
        personal projects — no credit card required.
      </p>
      <Button
        size="lg"
        className="gap-2 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground hover:bg-primary/90"
      >
        Get started free <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  </section>
);

export default CTA;
