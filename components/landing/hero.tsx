"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  MotionConfig,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1]; // out-quart

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Pointer-based parallax (disabled if reduced motion)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 12, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 12, mass: 0.4 });

  const titleTx = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const titleTy = useTransform(springY, [-0.5, 0.5], [-4, 4]);

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  };

  const containerVariants = {
    initial: { opacity: 0, y: 16, filter: "blur(2px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 },
    },
  };

  const itemUp = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: EASE } },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="hero-title"
        onMouseMove={onMove}
        className={cn(
          "relative overflow-hidden border-b",
          "bg-white text-slate-900 dark:bg-background dark:text-foreground",
          "will-change-[transform] select-none"
        )}
        style={
          {
            // Blue/White tokens
            // @ts-expect-error custom vars
            "--hero-primary": "#007BFF",
            "--hero-shadow": "rgba(0,123,255,0.25)",
          } as React.CSSProperties
        }
      >
        {/* super clean — no loud BGs */}

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            viewport={{ once: true, amount: 0.6 }}
            style={{
              translateX: reduceMotion ? 0 : titleTx,
              translateY: reduceMotion ? 0 : titleTy,
              willChange: "transform",
            }}
          >
            {/* Badge */}
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hero-primary)]/20 bg-[color:var(--hero-primary)]/5 px-3 py-1 text-xs font-medium text-[color:var(--hero-primary)] shadow-sm"
              {...itemUp(0)}
            >
              <span className="h-2 w-2 rounded-full bg-[color:var(--hero-primary)]" />
              Developer-first, open-source SDK
            </motion.span>

            {/* Heading */}
            <motion.h1
              id="hero-title"
              className="mt-5 text-balance text-4xl font-extrabold tracking-tight md:text-6xl"
              {...itemUp(0.05)}
            >
              <span className="block">Build AI Agents—</span>
              <span className="mt-1 block">
                Smarter, Simpler,&nbsp;
                <span className="relative inline-block">
                  <span className="relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[6px] after:rounded-full after:bg-[color:var(--hero-primary)]/25 after:content-['']">
                    Faster
                  </span>
                  .
                </span>
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg"
              {...itemUp(0.1)}
            >
              ABZ Agent SDK is your Python toolkit for Agentic AI with Gemini—zero boilerplate, tight DX,
              production-ready.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              {...itemUp(0.15)}
            >
              <Magnetic>
                <Button
                  asChild
                  className="h-11 rounded-lg px-6 shadow-md transition-all hover:shadow-lg hover:shadow-[color:var(--hero-shadow)]"
                >
                  <Link href="https://abzagent.vercel.app" aria-label="Get started building your first agent">
                    Get Started
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-lg px-6 border-[color:var(--hero-primary)]/30 bg-white/70 backdrop-blur-sm hover:bg-[color:var(--hero-primary)]/5 hover:border-[color:var(--hero-primary)]/60"
                >
                  <Link
                    href="https://abzagent.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View ABZ Agent SDK documentation"
                  >
                    View Docs
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Two matched cards (same height) */}
            <motion.div className="mt-10 grid gap-6 sm:grid-cols-2" {...itemUp(0.2)}>
              {/* Card A — pip install */}
              <motion.div
                whileHover={{ y: reduceMotion ? 0 : -2 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <TerminalCard title="agent setup">
                  <pre className="font-mono text-sm leading-6 text-slate-800 overflow-x-auto">
                    <code>
                      <TypeTicker text="pip install abagentsdk" startDelay={300} speed={28} disabled={reduceMotion} />
                    </code>
                  </pre>
                </TerminalCard>
              </motion.div>

              {/* Card B — LLM Support only */}
              <motion.div
                whileHover={{ y: reduceMotion ? 0 : -2 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <TerminalCard title="specs">
                  <div className="text-sm leading-6 text-slate-800">
                    <p>
                      <span className="text-slate-500">LLM Support:</span>{" "}
                      <span className="font-semibold">Gemini</span>
                    </p>
                  </div>
                </TerminalCard>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

/** Magnetic hover wrapper for CTAs (subtle lift toward cursor). */
function Magnetic({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const ty = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * 0.08);
    y.set(relY * 0.08);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{
        translateX: reduceMotion ? 0 : tx,
        translateY: reduceMotion ? 0 : ty,
        willChange: "transform",
      }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  );
}

/** Mac-style terminal card, matched heights */
function TerminalCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header bar with macOS dots + title */}
        <div className="flex items-center justify-between border-b bg-slate-100/70 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <div className="text-[11px] font-medium text-slate-600">{title}</div>
          <div className="w-10" /> {/* spacer to balance header */}
        </div>

        {/* Matched content height */}
        <div className="p-4 min-h-[112px] flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Minimal, SSR-safe typewriter for the install command. */
function TypeTicker({
  text,
  startDelay = 0,
  speed = 24,
  disabled = false,
}: {
  text: string;
  startDelay?: number;
  speed?: number; // ms per char
  disabled?: boolean;
}) {
  const [out, setOut] = React.useState(disabled ? text : "");
  const started = React.useRef(false);

  React.useEffect(() => {
    if (disabled) {
      setOut(text);
      return;
    }
    if (started.current) return;
    started.current = true;

    let i = 0;
    let raf = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      i = Math.min(i + 1, text.length);
      setOut(text.slice(0, i));
      if (i < text.length) {
        timeoutId = setTimeout(() => {
          raf = requestAnimationFrame(tick);
        }, speed);
      }
    };

    const start = () => {
      raf = requestAnimationFrame(tick);
    };

    if (startDelay > 0) {
      timeoutId = setTimeout(start, startDelay);
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay, disabled]);

  return (
    <span className="font-mono">
      {out}
      {!disabled && <span className="ml-0.5 inline-block h-4 w-[1px] animate-pulse bg-slate-700 align-middle" />}
    </span>
  );
}
