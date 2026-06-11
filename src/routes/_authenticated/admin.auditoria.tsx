import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/auditoria")({
  component: () => (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-bold capitalize">auditoria</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Módulo em construção — base de dados e regras de acesso já provisionadas.
      </p>
    </div>
  ),
});
