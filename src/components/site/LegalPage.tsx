import type { ReactNode } from "react";

export function LegalPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-sm font-medium text-primary">Legal</p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{lead}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
          {children}
        </div>
      </section>
    </>
  );
}
