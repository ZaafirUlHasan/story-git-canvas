import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Write naturally", description: "Use your favourite editor. Inkflow watches your files in the background." },
  { number: "02", title: "Save a snapshot", description: "Hit ⌘S or click 'Checkpoint.' Your draft is preserved forever with a short note." },
  { number: "03", title: "Compare & restore", description: "Browse your visual timeline, compare any two versions, or roll back in one click." },
];

const HowItWorks = () => (
  <section className="bg-card px-6 py-24 lg:py-32">
    <div className="mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
          Three steps. Zero jargon.
        </h2>
      </motion.div>

      <div className="space-y-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-6"
          >
            <span className="font-display text-5xl font-bold text-primary/20">
              {step.number}
            </span>
            <div>
              <h3 className="mb-1 font-display text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="font-body text-base text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
