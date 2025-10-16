"use client"

import { motion } from "framer-motion"

type TerminalProps = {
  title?: string
  lines: string[]
  className?: string
}

export function Terminal({ title = "zsh", lines, className }: TerminalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="region"
      aria-label="Terminal"
      className={`overflow-hidden rounded-lg shadow-2xl ${className || ""}`}
    >
      <div className="flex h-9 items-center gap-2 bg-[#2d2d2d] px-3 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
          <span className="size-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
          <span className="size-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
        </div>
        <div className="mx-auto text-xs font-medium text-[#b3b3b3]">{title}</div>
      </div>

      <div className="bg-[#1e1e1e] p-6 font-mono text-sm leading-relaxed min-h-[300px]">
        <div className="space-y-1 text-[#d4d4d4]">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <div className="flex items-center mt-2">
            <span className="text-[#4ec9b0]">user@macbook</span>
            <span className="text-[#d4d4d4] mx-1">~</span>
            <span className="text-[#d4d4d4]">%</span>
            <span
              className="ml-2 inline-block h-4 w-2 bg-[#d4d4d4]"
              style={{ animation: "blink 1s steps(2, start) infinite" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </motion.div>
  )
}
