export type Role = "system" | "user" | "assistant";
export type Message = { role: Role; content: string };

export async function sendChat(latestUserMessage: string) {
  const payload = { messages: [{ role: "user", content: latestUserMessage }] };

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // ignore parse errors; data stays null
  }

  if (!res.ok) {
    const err = data?.error || data?.detail || "Chat request failed";
    throw new Error(err);
  }

  // expected shape: { message: { role: "assistant", content: string } }
  return String(data?.message?.content ?? "");
}
