"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, Terminal, Sparkles } from "lucide-react";

const EASE: number[] = [0.22, 1, 0.36, 1];

export default function About() {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      aria-labelledby="about-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Card className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 md:p-12">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-5">
              {/* Left: Bigger Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="md:col-span-2 flex justify-center md:justify-start"
              >
                <div className="relative">
                  <Image
                    src="/images/abubakar.png"
                    alt="Abu Bakar — Agentic AI Developer & Educator"
                    width={650}
                    height={650}
                    priority
                    className="h-72 w-72 rounded-3xl object-cover shadow-md ring-1 ring-slate-200 md:h-96 md:w-96"
                  />
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-600 md:justify-start">
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    <span>Available for collaborations</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="md:col-span-3 text-center md:text-left"
              >
                <h2
                  id="about-title"
                  className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
                >
                  Built by Abu Bakar
                </h2>

                <p className="mt-4 max-w-prose text-base leading-7 text-slate-600">
                  Agentic AI Developer & Educator. Creator of{" "}
                  <span className="font-medium text-[#007BFF]">
                    ABZ Agent SDK
                  </span>
                  , empowering developers to build intelligent, Gemini-powered
                  systems that automate work, accelerate innovation, and
                  redefine productivity.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                  <Chip
                    icon={<ShieldCheck className="h-3.5 w-3.5" />}
                  >
                    Gemini Only
                  </Chip>
                  <Chip
                    icon={<Terminal className="h-3.5 w-3.5" />}
                  >
                    ABZ CLI
                  </Chip>
                  <Chip
                    icon={<Sparkles className="h-3.5 w-3.5" />}
                  >
                    Function Tools & Handoffs
                  </Chip>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Button asChild className="h-11 rounded-lg px-5 shadow-sm">
                    <Link
                      href="https://abubakar.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Abu Bakar&apos;s portfolio website"
                    >
                      Portfolio{" "}
                      <ExternalLink
                        className="ml-1.5 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-lg px-5 border-slate-300 bg-white hover:bg-slate-50"
                  >
                    <Link
                      href="https://linkedin.com/in/abubakar-bin-zohaib"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Abu Bakar&apos;s LinkedIn profile"
                    >
                      LinkedIn{" "}
                      <ExternalLink
                        className="ml-1.5 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

/* ------------------------------ UI bits ------------------------------ */

function Chip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#007BFF]/25 bg-[#007BFF]/5 px-3 py-1 text-xs font-medium text-[#007BFF]">
      {icon}
      {children}
    </span>
  );
}
