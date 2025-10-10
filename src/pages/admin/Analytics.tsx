import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Globe, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

const Analytics = () => {
  const { isLoading } = useAdminAuth();
  const [timeRange, setTimeRange] = useState('7');
  const [stats, setStats] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    pageViews: 0,
  });
  const [visitorsByDay, setVisitorsByDay] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<any[]>([]);
  const [topCountries, setTopCountries] = useState<any[]>([]);
  const [topReferrers, setTopReferrers] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    const daysAgo = parseInt(timeRange);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Total stats
    const { count: totalCount } = await supabase
      .from('analytics')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    const { data: uniqueData } = await supabase
      .from('analytics')
      .select('visitor_id')
      .gte('created_at', startDate.toISOString());

    const uniqueVisitors = new Set(uniqueData?.map(d => d.visitor_id)).size;

    setStats({
      totalVisitors: totalCount || 0,
      uniqueVisitors,
      pageViews: totalCount || 0,
    });

    // Visitors by day
    const { data: analyticsData } = await supabase
      .from('analytics')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    const dayMap = new Map();
    analyticsData?.forEach(item => {
      const day = new Date(item.created_at).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
      dayMap.set(day, (dayMap.get(day) || 0) + 1);
    });

    setVisitorsByDay(Array.from(dayMap.entries()).map(([name, visits]) => ({ name, visits })));

    // Top pages
    const { data: pageData } = await supabase
      .from('analytics')
      .select('page_path')
      .gte('created_at', startDate.toISOString());

    const pageMap = new Map();
    pageData?.forEach(item => {
      pageMap.set(item.page_path, (pageMap.get(item.page_path) || 0) + 1);
    });

    setTopPages(
      Array.from(pageMap.entries())
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
    );

    // Top countries
    const { data: countryData } = await supabase
      .from('analytics')
      .select('country')
      .gte('created_at', startDate.toISOString())
      .not('country', 'is', null);

    const countryMap = new Map();
    countryData?.forEach(item => {
      countryMap.set(item.country, (countryMap.get(item.country) || 0) + 1);
    });

    setTopCountries(
      Array.from(countryMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
    );

    // Top referrers
    const { data: referrerData } = await supabase
      .from('analytics')
      .select('referrer')
      .gte('created_at', startDate.toISOString())
      .not('referrer', 'is', null)
      .neq('referrer', '');

    const referrerMap = new Map();
    referrerData?.forEach(item => {
      referrerMap.set(item.referrer, (referrerMap.get(item.referrer) || 0) + 1);
    });

    setTopReferrers(
      Array.from(referrerMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
    );
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Estatísticas de tráfego do site</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Hoje</SelectItem>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visitantes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueVisitors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pageViews}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visitantes ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Países</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topCountries}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {topCountries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Páginas Mais Visitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Origem do Tráfego</CardTitle>
            <CardDescription>Top 5 referências</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReferrers.map((referrer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate max-w-[200px]">{referrer.name}</span>
                  </div>
                  <span className="text-sm font-medium">{referrer.value}</span>
                </div>
              ))}
              {topReferrers.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum referrer registrado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
