import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, TrendingUp, Eye, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

interface Appointment {
  id: string;
  name: string;
  date: string;
  status: string;
}

export default function AdminDashboard() {
  const { isLoading } = useAdminAuth();
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalAppointments: 0,
    totalVisitors: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [leadsByStatus, setLeadsByStatus] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadRecentLeads();
    loadUpcomingAppointments();
    loadLeadsByStatus();
  }, []);

  const loadStats = async () => {
    const [leads, appointments, analytics] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact' }),
      supabase.from('appointments').select('*', { count: 'exact' }),
      supabase.from('analytics').select('*', { count: 'exact' }),
    ]);

    const newLeads = await supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .eq('status', 'new');

    setStats({
      totalLeads: leads.count || 0,
      newLeads: newLeads.count || 0,
      totalAppointments: appointments.count || 0,
      totalVisitors: analytics.count || 0,
    });
  };

  const loadRecentLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .eq('status', 'new')
      .order('created_at', { ascending: false })
      .limit(5);
    
    setRecentLeads(data || []);
  };

  const loadUpcomingAppointments = async () => {
    const now = new Date().toISOString();
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .gte('date', now)
      .in('status', ['pending', 'confirmed'])
      .order('date', { ascending: true })
      .limit(5);
    
    setUpcomingAppointments(data || []);
  };

  const loadLeadsByStatus = async () => {
    const { data } = await supabase
      .from('leads')
      .select('status');
    
    if (data) {
      const statusCounts = data.reduce((acc: any, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(statusCounts).map(([name, value]) => ({
        name: name === 'new' ? 'Novos' : 
              name === 'contacted' ? 'Contactados' :
              name === 'converted' ? 'Convertidos' : 'Perdidos',
        value
      }));

      setLeadsByStatus(chartData);
    }
  };

  const COLORS = ['#3b82f6', '#eab308', '#22c55e', '#ef4444'];

  const conversionRate = stats.totalVisitors > 0 
    ? ((stats.totalLeads / stats.totalVisitors) * 100).toFixed(1)
    : 0;

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-secondary mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newLeads} novos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Total de agendamentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            <p className="text-xs text-muted-foreground">
              Total de visitantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Leads / Visitantes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Leads Quentes (Novos)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <Badge variant="secondary">
                      {format(new Date(lead.created_at), 'dd/MM HH:mm', { locale: ptBR })}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum lead novo no momento
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(appointment.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum agendamento próximo
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {leadsByStatus.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Leads por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
