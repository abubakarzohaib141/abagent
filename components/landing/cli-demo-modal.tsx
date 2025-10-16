"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Terminal } from "./terminal"
import { motion } from "framer-motion"

const demoLines = [
  "user@macbook ~ % abagent setup",
  "",
  "ABZ Agent SDK Setup",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "Enter your GEMINI_API_KEY: ••••••••••••••••••••••••",
  "✓ API key validated successfully",
  "",
  "Agent name (default: ABZ Agent): ABZ Helper",
  "Default model (default: gemini-2.0-flash): gemini-2.0-flash",
  "",
  "✓ Configuration saved to .abagent/config.json",
  "✓ Setup complete!",
  "",
  "Next steps:",
  "  1. Create your agent file: touch agent.py",
  "  2. Run your agent: abagent run agent.py",
  "  3. Try the REPL: abagent repl",
  "",
  "Happy building!",
]

export default function CliDemoModal() {
  const [open, setOpen] = React.useState(false)
  const [typed, setTyped] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!open) {
      setTyped([])
      return
    }

    let lineIndex = 0
    const typeNextLine = () => {
      if (lineIndex < demoLines.length) {
        setTyped((prev) => [...prev, demoLines[lineIndex]])
        lineIndex++
        setTimeout(typeNextLine, lineIndex === 1 ? 400 : lineIndex === 2 ? 200 : 100)
      }
    }

    typeNextLine()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            variant="outline"
            className="h-10 rounded-lg px-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-transparent"
          >
            Preview CLI Demo
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl bg-transparent border-none shadow-none p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>CLI Demo</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Terminal title="zsh" lines={typed} />
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
