import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — VSMS Solutions" },
      { name: "description", content: "Fale com a VSMS Solutions. WhatsApp, e-mail e formulário para iniciar seu projeto." },
      { property: "og:title", content: "Contato — VSMS Solutions" },
      { property: "og:description", content: "Vamos conversar sobre o seu projeto." },
      { property: "og:url", content: "https://vsms.com.br/contato" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/contato" }],
  }),
  component: Contato,
});

function Contato() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: integrar com backend / Lovable Cloud na próxima fase
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Contato</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Vamos <span className="text-gradient">conversar</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Quer adotar um produto VSMS, integrar nossas plataformas ou tirar
            dúvidas? Respondemos em até 1 dia útil.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h2 className="font-display text-2xl font-semibold">Mensagem enviada</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Recebemos seu contato. Vamos responder em até 1 dia útil.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field id="name" label="Nome" required maxLength={120} autoComplete="name" />
                  <Field id="email" label="E-mail" type="email" required maxLength={200} autoComplete="email" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field id="company" label="Empresa" maxLength={120} autoComplete="organization" />
                  <Field id="phone" label="Telefone / WhatsApp" type="tel" maxLength={40} autoComplete="tel" />
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sobre o que você quer falar?<span className="ml-0.5 text-primary">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="" disabled>Selecione um assunto</option>
                    <option value="produto">Quero usar um produto VSMS</option>
                    <option value="implantacao">Implantação / integração</option>
                    <option value="parceria">Parceria comercial</option>
                    <option value="suporte">Suporte a cliente atual</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Como podemos ajudar?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    className="mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar mensagem"} <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <ContactCard icon={Mail} title="E-mail" value="contato@vsms.com.br" href="mailto:contato@vsms.com.br" />
            <ContactCard icon={MessageCircle} title="WhatsApp" value="+55 (11) 90000-0000" href="https://wa.me/5511900000000" />
            <ContactCard icon={Phone} title="Telefone" value="+55 (11) 0000-0000" href="tel:+5511000000000" />
            <ContactCard icon={MapPin} title="Endereço" value="São Paulo, Brasil" />
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  maxLength,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        maxLength={maxLength}
        className="mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-brand-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="mt-0.5 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {Inner}
    </a>
  ) : (
    Inner
  );
}
