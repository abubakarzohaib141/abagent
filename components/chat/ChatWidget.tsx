"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import ChatPanel from "./ChatPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50"
          >
            <Button
              onClick={() => setOpen(true)}
              aria-label="Open ABZ Bot"
              size="icon"
              className="h-14 w-14 rounded-full bg-[#007BFF] text-white shadow-xl hover:bg-[#0a63cc]"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[92vw] sm:max-w-lg gap-0 overflow-hidden rounded-2xl border-0 p-0 shadow-2xl [&>button]:hidden"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#007BFF]/10 to-white px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="text-left">
                <DialogTitle className="text-base font-semibold leading-none">ABZ Bot</DialogTitle>
                <p className="text-xs text-muted-foreground">Powered by Gemini</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="bg-white p-3">
            <ChatPanel />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
