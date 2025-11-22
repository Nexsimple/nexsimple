import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, DollarSign, Target } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AffiliateStats {
  affiliate_id: string;
  affiliate_code: string;
  affiliate_name: string;
  total_clicks: number;
  total_leads: number;
  conversion_rate: number;
  qualified_leads: number;
}

const AffiliateAnalytics = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [stats, setStats] = useState<AffiliateStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [averageConversion, setAverageConversion] = useState(0);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadAnalytics();
    }
  }, [isAdmin]);

  const loadAnalytics = async () => {
    try {
      // Buscar todos os afiliados
      const { data: affiliates, error: affiliatesError } = await supabase
        .from("affiliates")
        .select("id, affiliate_code, name");

      if (affiliatesError) throw affiliatesError;

      const statsData: AffiliateStats[] = [];

      for (const affiliate of affiliates || []) {
        // Contar cliques únicos (visitantes)
        const { data: analyticsData, error: analyticsError } = await supabase
          .from("analytics")
          .select("visitor_id", { count: "exact" })
          .eq("utm_id", affiliate.affiliate_code);

        if (analyticsError) throw analyticsError;

        const uniqueVisitors = new Set(
          analyticsData?.map((a) => a.visitor_id) || []
        ).size;

        // Contar leads gerados
        const { data: leadsData, error: leadsError } = await supabase
          .from("leads")
          .select("id, status", { count: "exact" })
          .eq("affiliate_id", affiliate.id);

        if (leadsError) throw leadsError;

        const totalLeads = leadsData?.length || 0;
        const qualifiedLeads =
          leadsData?.filter((l) => l.status === "qualified").length || 0;

        const conversionRate =
          uniqueVisitors > 0 ? (totalLeads / uniqueVisitors) * 100 : 0;

        statsData.push({
          affiliate_id: affiliate.id,
          affiliate_code: affiliate.affiliate_code,
          affiliate_name: affiliate.name,
          total_clicks: uniqueVisitors,
          total_leads: totalLeads,
          conversion_rate: conversionRate,
          qualified_leads: qualifiedLeads,
        });
      }

      // Calcular totais
      const clicks = statsData.reduce((sum, s) => sum + s.total_clicks, 0);
      const leads = statsData.reduce((sum, s) => sum + s.total_leads, 0);
      const avgConv = clicks > 0 ? (leads / clicks) * 100 : 0;

      setStats(statsData);
      setTotalClicks(clicks);
      setTotalLeads(leads);
      setAverageConversion(avgConv);
    } catch (error) {
      console.error("Erro ao carregar analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => navigate("/admin/affiliates")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics de Afiliados
          </h1>
          <p className="text-muted-foreground mt-2">
            Métricas de conversão e performance
          </p>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Cliques
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Visitantes únicos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Leads
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Leads gerados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageConversion.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Média geral
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Afiliados Ativos
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total cadastrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Afiliado</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Afiliado</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead className="text-right">Cliques</TableHead>
                  <TableHead className="text-right">Leads</TableHead>
                  <TableHead className="text-right">Qualificados</TableHead>
                  <TableHead className="text-right">Conversão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.map((stat) => (
                  <TableRow key={stat.affiliate_id}>
                    <TableCell className="font-medium">
                      {stat.affiliate_name}
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {stat.affiliate_code}
                      </code>
                    </TableCell>
                    <TableCell className="text-right">
                      {stat.total_clicks}
                    </TableCell>
                    <TableCell className="text-right">
                      {stat.total_leads}
                    </TableCell>
                    <TableCell className="text-right">
                      {stat.qualified_leads}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          stat.conversion_rate > 5
                            ? "text-green-500 font-semibold"
                            : stat.conversion_rate > 2
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                        }
                      >
                        {stat.conversion_rate.toFixed(2)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum dado de analytics disponível ainda.</p>
              <p className="text-sm mt-2">
                Os dados aparecerão quando houver visitantes com links UTM
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateAnalytics;
