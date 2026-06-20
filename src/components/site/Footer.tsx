import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import logoAsset from "@/assets/logo.png";
import { getSiteConfig, SITE_DEFAULTS } from "@/lib/site/site.functions";

type LinkItem = { label: string; to: string };
type Column = { title: string; links: LinkItem[] };
type FooterCfg = { description?: string; columns?: Column[]; copyright?: string };
type Social = { linkedin?: string; github?: string; instagram?: string; twitter?: string };
type Contact = { email?: string };
type Brand = { name?: string; logo_url?: string | null };

export function Footer() {
  const { data } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => getSiteConfig(),
    staleTime: 5 * 60_000,
  });

  const brand = (data?.["site.brand"] ?? SITE_DEFAULTS["site.brand"]) as Brand;
  const footer = (data?.["site.footer"] ?? SITE_DEFAULTS["site.footer"]) as FooterCfg;
  const social = (data?.["site.social"] ?? SITE_DEFAULTS["site.social"]) as Social;
  const contact = (data?.["site.contact"] ?? SITE_DEFAULTS["site.contact"]) as Contact;

  const brandName = brand.name || "VSMS Solutions";
  const logoSrc = brand.logo_url || logoAsset;
  const columns = footer.columns?.length ? footer.columns : [];

  const socials = [
    { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
    { icon: Github, href: social.github, label: "GitHub" },
    { icon: Instagram, href: social.instagram, label: "Instagram" },
    { icon: Mail, href: contact.email ? `mailto:${contact.email}` : "", label: "E-mail" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" aria-label={brandName}>
              <img src={logoSrc} alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight">
                {brandName.split(" ")[0]}
                <span className="text-gradient"> {brandName.split(" ").slice(1).join(" ") || "Solutions"}</span>
              </span>
            </Link>
            {footer.description && (
              <p className="mt-4 max-w-md text-sm text-muted-foreground">{footer.description}</p>
            )}
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href as string}
                    aria-label={label}
                    target={href!.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <a href={l.to} className="hover:text-foreground">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {footer.copyright || `${brandName}. Todos os direitos reservados.`}</p>
          <p>vsms.com.br</p>
        </div>
      </div>
    </footer>
  );
}
