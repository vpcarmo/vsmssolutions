import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" aria-label="VSMS Solutions">
              <img src={logo} alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight">
                VSMS<span className="text-gradient"> Solutions</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Empresa de tecnologia orientada a produto. Criamos e operamos
              plataformas SaaS, soluções de IA e ferramentas digitais próprias
              para pessoas e empresas.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Mail, href: "mailto:contato@vsms.com.br", label: "E-mail" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/produtos" className="hover:text-foreground">Produtos</Link></li>
              <li><Link to="/servicos" className="hover:text-foreground">Serviços de apoio</Link></li>
              <li><Link to="/sobre" className="hover:text-foreground">Sobre</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground">Portfólio</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacidade" className="hover:text-foreground">Privacidade</Link></li>
              <li><Link to="/cookies" className="hover:text-foreground">Cookies</Link></li>
              <li><Link to="/termos" className="hover:text-foreground">Termos de uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} VSMS Solutions. Todos os direitos reservados.</p>
          <p>vsms.com.br</p>
        </div>
      </div>
    </footer>
  );
}
