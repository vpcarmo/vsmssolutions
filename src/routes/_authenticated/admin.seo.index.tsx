import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { listSeo, seoOverview } from "@/lib/admin/seo.functions";
import { listPages } from "@/lib/admin/pages.functions";

export const Route = createFileRoute("/_authenticated/admin/seo/")({
  component: SeoIndex,
});

function SeoIndex() {
  const listFn = useServerFn(listSeo);
  const overviewFn = useServerFn(seoOverview);
  const pagesFn = useServerFn(listPages);
  const [q, setQ] = useState("");

  const { data: overview } = useQuery({
    queryKey: ["admin", "seo", "overview"],
    queryFn: () => overviewFn({ data: undefined as any }),
  });
  const { data: rows = [] } = useQuery({
    queryKey: ["admin", "seo", "list"],
    queryFn: () => listFn({ data: undefined as any }),
  });
  const { data: pages = [] } = useQuery({
    queryKey: ["admin", "pages", "for-seo"],
    queryFn: () => pagesFn({ data: undefined as any }),
  });

  const pageMap = new Map<string, any>((pages as any[]).map((p) => [p.id, p]));
  const filtered = (rows as any[]).filter((r) =>
    !q ? true : (r.title ?? "").toLowerCase().includes(q.toLowerCase()) ||
    (pageMap.get(r.resource_id)?.title ?? "").toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">SEO</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestão polimórfica de metadados para páginas, produtos e posts.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Páginas" value={overview?.totalPages ?? "—"} />
        <Stat label="Com SEO" value={overview?.configured ?? "—"} />
        <Stat label="Sem SEO" value={overview?.missing ?? "—"} tone="warn" />
        <Stat label="Sem título" value={overview?.missingTitle ?? "—"} tone="warn" />
        <Stat label="Noindex" value={overview?.noindexed ?? "—"} tone="warn" />
      </div>

      {overview?.pagesWithoutSeo?.length ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Páginas sem SEO configurado</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {overview.pagesWithoutSeo.map((p: any) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span>{p.title}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin/seo/$resourceType/$resourceId" params={{ resourceType: "page", resourceId: p.id }}>
                      Configurar
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Registros SEO</CardTitle>
          <Input
            placeholder="Buscar..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-xs"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recurso</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Título SEO</TableHead>
                <TableHead>Robots</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => {
                const parent = pageMap.get(r.resource_id);
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">
                      {parent?.title ?? r.resource_id.slice(0, 8)}
                    </TableCell>
                    <TableCell><Badge variant="secondary">{r.resource_type}</Badge></TableCell>
                    <TableCell className="max-w-xs truncate">{r.title ?? <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell>
                      {r.noindex && <Badge variant="destructive" className="mr-1">noindex</Badge>}
                      {r.nofollow && <Badge variant="outline">nofollow</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link
                          to="/admin/seo/$resourceType/$resourceId"
                          params={{ resourceType: r.resource_type, resourceId: r.resource_id }}
                        >
                          Editar
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!filtered.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">
                    Nenhum registro SEO encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: any; tone?: "warn" }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`mt-1 text-2xl font-semibold ${tone === "warn" ? "text-amber-600" : ""}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
