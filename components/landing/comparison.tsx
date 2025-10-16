"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"

const rows = [
  { feature: "Integration", openai: "Complex Gemini API integration", abz: "One-line Gemini + Tavily setup" },
  { feature: "Cost", openai: "Requires paid API", abz: "Free & open for all" },
  { feature: "Speed", openai: "Slow initialization", abz: "Instant setup" },
  { feature: "Simplicity", openai: "Advanced configuration", abz: "Just load your key" },
  { feature: "Developer Focus", openai: "For enterprise setups", abz: "For indie devs & educators" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20" aria-labelledby="comparison-title">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <h2 id="comparison-title" className="text-balance text-2xl font-semibold md:text-4xl">
          Why Developers Choose ABZ Agent SDK
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Simple, fast, and built for creators who want to build Agentic systems—without barriers.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* OpenAI Card */}
        <motion.div variants={itemVariants}>
          <Card className="group relative h-full overflow-hidden rounded-2xl border bg-card/50 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-muted-foreground/30 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <CardHeader className="pb-4 relative">
              <CardTitle className="text-xl">OpenAI Agent SDK</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">Traditional approach</p>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              {rows.map((r, i) => (
                <motion.div
                  key={r.feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-1 border-b pb-3 last:border-0"
                >
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {r.feature}
                  </span>
                  <span className="text-sm text-muted-foreground">{r.openai}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* ABZ Card - Highlighted with enhanced animations */}
        <motion.div variants={itemVariants}>
          <Card className="group relative h-full overflow-hidden rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/80 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <CardHeader className="pb-4 relative">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    ABZ Agent SDK
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                    </motion.div>
                  </CardTitle>
                  <p className="mt-1 text-xs text-primary/70">Modern & fast</p>
                </div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                  viewport={{ once: true }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20"
                >
                  <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                </motion.div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              {rows.map((r, i) => (
                <motion.div
                  key={r.feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-1 border-b border-primary/10 pb-3 last:border-0"
                >
                  <span className="text-xs font-semibold text-primary/70 uppercase tracking-wide">{r.feature}</span>
                  <span className="text-sm font-medium text-primary">{r.abz}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
