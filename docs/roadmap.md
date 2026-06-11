# VSMS Admin — Roadmap

## Fase 1 (em implementação)
- Tenant padrão VSMS
- Autenticação (email/senha)
- RBAC simplificado: `super_admin`, `admin`, `editor`
- Catálogo de Produtos
- Páginas (CMS)
- Blog (posts com conteúdo JSONB)
- SEO meta por recurso
- Biblioteca de Mídia
- Formulários dinâmicos + captação de Leads
- Log de Auditoria
- Configurações (kv por escopo)
- Feature Flags (catálogo + override por produto)

## Fase 2 — Operação avançada
- Permission overrides (matriz granular por recurso/ação)
- Versionamento avançado de páginas e posts (revisões + diff)
- Particionamento de `audit_log` e `form_submissions` por mês
- Sitemap em job agendado salvando arquivo estático
- Dedupe avançado de mídia + variantes responsivas pré-geradas
- Workflow editorial (rascunho → revisão → publicação)
- Webhooks de saída

## Fase 3 — Módulos opcionais (já modelados, desativados por feature flag)
- **Financeiro**: planos, assinaturas, faturas, pagamentos, MRR/ARR, despesas
- **IA**: assistentes, prompts, automações, modelos, consumo, custos, logs, avaliações
- **Analytics**: integração GA4, Search Console, Microsoft Clarity, funis, conversões

## Fase 4 — Operação enterprise
- Backup e recuperação (snapshots agendados + restore point-in-time)
- Exportação e importação de dados (CSV/JSON por tenant)
- Multi-tenant pleno (criação self-service de tenants, JWT `tenant_id`, billing por tenant)
- Escalabilidade avançada (read replicas, cache distribuído, edge caching de páginas públicas)
- SSO/SAML para tenants enterprise
- Auditoria com retenção configurável + export para storage frio
- Observabilidade (tracing distribuído, métricas custom, alertas)

## Princípios mantidos
- Núcleo compartilhado entre produtos; extensões opcionais por feature flag
- Toda tabela de domínio carrega `tenant_id` desde o dia 1
- Helpers RLS `STABLE SECURITY DEFINER` reutilizáveis
- Nada de overrides granulares antes de existir necessidade real
