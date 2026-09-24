import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png";
import { getSiteConfig, SITE_DEFAULTS } from "@/lib/site/site.functions";

type NavItem = { label: string; to: string };
type Brand = { name?: string; tagline?: string; logo_url?: string | null };
type Nav = { items?: NavItem[]; cta?: NavItem };

function PublicNavLink({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}) {
  if (to.startsWith("/") && !to.startsWith("//")) {
    return (
      <Link to={to as never} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => getSiteConfig(),
    staleTime: 5 * 60_000,
  });

  const brand = (data?.["site.brand"] ?? SITE_DEFAULTS["site.brand"]) as Brand;
  const nav = (data?.["site.navigation"] ?? SITE_DEFAULTS["site.navigation"]) as Nav;
  const items: NavItem[] = nav.items?.length ? nav.items : (SITE_DEFAULTS["site.navigation"] as Nav).items!;
  const cta = nav.cta ?? (SITE_DEFAULTS["site.navigation"] as Nav).cta!;
  const logoSrc = brand.logo_url || logoAsset;
  const brandName = brand.name || "VSMS Solutions";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label={brandName}>
          <img src={logoSrc} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight">
            {brandName.split(" ")[0]}
            <span className="text-gradient"> {brandName.split(" ").slice(1).join(" ") || "Solutions"}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {items.map((item) => (
            <PublicNavLink
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </PublicNavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <PublicNavLink
            to={cta.to}
            className="inline-flex items-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            {cta.label}
          </PublicNavLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="glass border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-3" aria-label="Mobile">
            {items.map((item) => (
              <PublicNavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </PublicNavLink>
            ))}
            <PublicNavLink
              to={cta.to}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2.5 text-sm font-medium text-brand-foreground"
            >
              {cta.label}
            </PublicNavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
