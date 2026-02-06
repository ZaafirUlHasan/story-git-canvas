import { motion } from "framer-motion";
import { Eye, GitBranch, History, Users } from "lucide-react";

const features = [
  {
    icon: History,
    title: "Visual Timeline",
    description:
      "See every save as a point on a beautiful timeline. Click any moment to read exactly what you had.",
  },
  {
    icon: Eye,
    title: "Side-by-Side Diffs",
    description:
      "Highlight what changed between any two drafts — additions in green, deletions in red, plain English.",
  },
  {
    icon: GitBranch,
    title: "Branches as Drafts",
    description:
      "Explore alternate endings or restructure a chapter without touching your main manuscript.",
  },
  {
    icon: Users,
    title: "Effortless Collaboration",
    description:
      "Invite editors or co-authors. Accept or reject their suggestions with one click — no merge conflicts.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const Features = () => (
  <section className="px-6 py-24 lg:py-32">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
          Everything you need, nothing you don't
        </h2>
        <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
          We translated Git's most powerful features into concepts that make
          sense to writers, editors, and storytellers.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
