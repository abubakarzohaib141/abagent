"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Brain, Terminal, Zap, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Setup",
    text:
      "Run abagent setup — validate GEMINI_API_KEY, choose a model, write config, and start building in seconds.",
  },
  {
    icon: Bot,
    title: "Gemini Integration",
    text:
      "Native support for Google Gemini (1.5 / 2.0 family). Opinionated defaults for streaming & structured output.",
  },
  {
    icon: Brain,
    title: "Intelligent Agents",
    text:
      "Dynamic instructions, guardrails, function tools, handoffs, and schema-first responses for production DX.",
  },
  {
    icon: Terminal,
    title: "Open Source & CLI",
    text:
      "Transparent and community-driven. Ship fast with the ABZ CLI: abagent run · abagent repl · abagent deploy.",
  },
];

const EASE: number[] = [0.22, 1, 0.36, 1];

export default function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative mx-auto max-w-6xl px-6 py-16 md:py-24"
      aria-labelledby="features-title"
    >
      {/* Clean header — no background effects */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8 text-center md:mb-12"
      >
        <h2
          id="features-title"
          className="text-balance text-2xl font-bold md:text-4xl"
        >
          Why Developers Choose ABZ Agent SDK
        </h2>

        {/* Tight, product-y badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Badge pill>
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
            Gemini Only
          </Badge>
          <Badge pill>
            <Terminal className="mr-1.5 h-3.5 w-3.5" />
            ABZ CLI Supported
          </Badge>
        </div>
      </motion.div>

      {/* Product-grade tiles (no noisy bg) */}
      <div
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6"
      >
        {FEATURES.map((f, i) => (
          <FeatureTile
            key={f.title}
            icon={f.icon}
            title={f.title}
            text={f.text}
            index={i}
            delay={0.06 * i}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Tiles ------------------------------- */

function FeatureTile({
  icon: Icon,
  title,
  text,
  index,
  delay,
  reduceMotion,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  index: number;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {/* Gradient micro-border wrapper (1px) */}
      <div className="rounded-2xl bg-gradient-to-br from-[#007BFF]/15 via-transparent to-[#007BFF]/25 p-[1px]">
        <Card className="relative h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
          {/* subtle top-right glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#007BFF]/10 blur-2xl" />

          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <IconChip>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </IconChip>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>

          <CardContent className="text-sm leading-6 text-slate-600">
            <p>{text}</p>

            {/* Tiny divider + mini-meta to feel product-y */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#007BFF]" />
                Stable API
              </span>
              <span>MIT License</span>
            </div>
          </CardContent>

          {/* Hover affordance: clean outline + lift (no tilt, no wobble) */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[#007BFF]/0 transition-[ring-color,ring-width] duration-200 group-hover:ring-2" />
        </Card>
      </div>
    </motion.div>
  );
}

/** Icon chip: minimal, crisp, no distracting effects */
function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#007BFF]/10 text-[#007BFF] ring-1 ring-[#007BFF]/20">
      {children}
    </div>
  );
}

/** Tiny pill badge */
function Badge({
  children,
  pill = false,
}: {
  children: React.ReactNode;
  pill?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center border border-[#007BFF]/25 bg-[#007BFF]/5 px-2.5 py-1 text-xs font-medium text-[#007BFF] shadow-sm",
        pill ? "rounded-full" : "rounded-md",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
