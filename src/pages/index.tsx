import { useTickets } from "@/hooks/use-tickets";
import { TopNav } from "@/components/layout/top-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export default function Dashboard() {
  const { data: tickets, isLoading } = useTickets();

  if (isLoading) return <div>Loading dashboard...</div>;

  const openCount = tickets?.filter(t => t.status === 'open').length || 0;
  const inProgressCount = tickets?.filter(t => t.status === 'in_progress').length || 0;
  const resolvedCount = tickets?.filter(t => t.status === 'resolved').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="p-8 space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{openCount}</div></CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{inProgressCount}</div></CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{resolvedCount}</div></CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
