import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetDashboardStatsQuery } from '@/store/api/adminApi';
import { Users, Briefcase, Tag, Wrench, CheckCircle, Clock, MessageSquare, TrendingUp } from 'lucide-react';

const iconMap: Record<string, any> = {
  'Total Users': Users,
  'Total Partners': Briefcase,
  'Active Offers': Tag,
  'Active Services': Wrench,
  'Bookings Assigned': CheckCircle,
  'Bookings Not Assigned': Clock,
  'Open Enquiries': MessageSquare,
  'Monthly Growth': TrendingUp,
};

export default function Dashboard() {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-muted-foreground animate-pulse text-lg font-medium">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-destructive text-lg font-medium">Error loading dashboard statistics</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat) => {
          const Icon = iconMap[stat.label] || TrendingUp;
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.isDummy && (
                  <div className="mt-2 flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Dummy Data
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
