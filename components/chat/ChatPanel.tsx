"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChat } from "@/lib/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizonal } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatPanel() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  // auto-scroll on new message
  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    // optimistic user bubble
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      // use our helper that posts to /api/chat and returns assistant text
      const reply = await sendChat(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err: any) {
      const msg = err?.message || "Error contacting server";
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-lg">
      <CardContent className="p-0">
        <div ref={listRef} className="h-96 overflow-y-auto px-4 py-5 space-y-3 scroll-smooth">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-20 text-center text-sm text-muted-foreground"
              >
                💬 Ask me anything about ABZ Agent SDK
              </motion.p>
            )}

            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-6 shadow-sm ${
                    m.role === "user"
                      ? "bg-[#007BFF] text-white rounded-br-none"
                      : "bg-slate-100 text-slate-800 rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-slate-100 px-4 py-2 text-sm text-slate-800 shadow-sm">
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.3s]" />
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.15s]" />
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-slate-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t bg-gradient-to-r from-white to-slate-50 p-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="h-10 focus-visible:ring-primary"
          />
          <Button type="submit" disabled={loading || !input.trim()} className="h-10 w-10 rounded-full p-0">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
