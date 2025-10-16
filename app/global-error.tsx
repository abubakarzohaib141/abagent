// app/global-error.tsx
"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <main className="mx-auto max-w-2xl p-8 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
        </main>
      </body>
    </html>
  );
}
