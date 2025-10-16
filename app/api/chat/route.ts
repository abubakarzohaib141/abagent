import { NextRequest, NextResponse } from "next/server";

// Hardcoded to your deployed backend (no trailing slash)
const API_BASE = "https://server-deploy-on-render.vercel.app";
const CHAT_URL = `${API_BASE}/v1/chat`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Keep this generous to tolerate cold starts / first-hit slowness
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    const upstream = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const text = await upstream.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!upstream.ok) {
      const detail =
        data?.detail || data?.error || data?.message || data?.raw || text || "Unknown upstream error";
      return NextResponse.json(
        { error: `Upstream ${upstream.status}: ${detail}`, upstream: data },
        { status: upstream.status }
      );
    }

    // ✅ Always return JSON to the client
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    const msg =
      e?.name === "AbortError"
        ? "Upstream timeout (60s). Try again."
        : e?.message || "Proxy failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
