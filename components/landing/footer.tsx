import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-3 flex items-center justify-center gap-6 text-sm">
          <Link
            href="https://abzagent.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/ABZAgent/abzagentsdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="https://community.abzagent.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Community
          </Link>
        </nav>
        <p className="text-center text-xs text-muted-foreground">{"© 2025 ABZ Agent SDK. All rights reserved."}</p>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {"Powered by Google Gemini | Inspired by OpenAI Agents SDK"}
        </p>
      </div>
    </footer>
  )
}
