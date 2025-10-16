"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CliDemoModal from "./cli-demo-modal";
import { Check, Copy } from "lucide-react";

const code = `from abagentsdk import Agent, Memory, function_tool

@function_tool()
def add(x: float, y: float) -> str:
    "Add two numbers and return their sum."
    return str(x + y)

agent = Agent(
    name="ABZ Helper",
    instructions="Be concise and use tools efficiently.",
    model="gemini-2.0-flash",
    tools=[add],
    memory=Memory(),
)

print(agent.run("What is 2 + 2?").content)
`;

export default function DemoSection() {
  return (
    <section
      id="demo"
      className="mx-auto max-w-6xl px-6 py-14 md:py-20"
      aria-labelledby="demo-title"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 text-center md:mb-12"
      >
        <h2
          id="demo-title"
          className="text-balance text-2xl font-semibold md:text-4xl"
        >
          Build Your First Agent in Seconds
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Python-first. <span className="font-medium text-primary">Gemini-only</span>. ABZ CLI included.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {/* Left: Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header bar (macOS dots + Copy) */}
            <div className="flex items-center justify-between border-b bg-slate-100/70 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[11px] font-medium text-slate-600">
                agent.py
              </div>
              <CopyButton text={code} />
            </div>

            <CardContent className="p-0">
              <pre className="rounded-b-2xl bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-800">
                <code>{code}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Bullets + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <Bullet>
                  Gemini models only — optimized prompts & streaming baked in.
                </Bullet>
                <Bullet>
                  ABZ CLI: <code className="font-mono">setup</code>,{" "}
                  <code className="font-mono">run</code>,{" "}
                  <code className="font-mono">repl</code>.
                </Bullet>
                <Bullet>
                  Function tools, handoffs, guardrails, and schema output ready
                  on day 1.
                </Bullet>
                <Bullet>
                  Single-file start:{" "}
                  <code className="font-mono">agent.py</code> — no boilerplate.
                </Bullet>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild className="h-10 rounded-lg px-4 shadow-sm">
                  <Link
                    href="https://abzagent.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read the documentation"
                  >
                    Read the Docs
                  </Link>
                </Button>
                <CliDemoModal />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white/70 px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-white"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copy
        </>
      )}
    </button>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#007BFF]" />
      <span>{children}</span>
    </li>
  );
}
