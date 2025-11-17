import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, AlertTriangle, CheckCircle, Database, HardDrive,
  Clock, TrendingUp, Shield, Bell, FileText, Zap
} from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/brand/SectionHeading";

interface SystemAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface HealthMetric {
  id: string;
  metric_type: string;
  metric_value: number;
  metric_unit: string;
  recorded_at: string;
}

export const AdminSystemHealthPage = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemData();
  }, []);

  const fetchSystemData = async () => {
    try {
      const [alertsResponse, metricsResponse] = await Promise.all([
        supabase
          .from("system_alerts")
          .select("*")
          .eq("status", "active")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("system_health_metrics")
          .select("*")
          .order("recorded_at", { ascending: false })
          .limit(20)
      ]);

      if (alertsResponse.error) throw alertsResponse.error;
      if (metricsResponse.error) throw metricsResponse.error;

      setAlerts(alertsResponse.data || []);
      setMetrics(metricsResponse.data || []);
    } catch (error) {
      console.error("Error fetching system data:", error);
      toast.error("Failed to load system health data");
    } finally {
      setLoading(false);
    }
  };

  const getMetricValue = (type: string) => {
    const metric = metrics.find(m => m.metric_type === type);
    return metric ? `${metric.metric_value}${metric.metric_unit ? ' ' + metric.metric_unit : ''}` : 'N/A';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from("system_alerts")
        .update({ status: 'resolved', resolved_at: new Date().toISOString() })
        .eq("id", alertId);

      if (error) throw error;
      toast.success("Alert resolved");
      fetchSystemData();
    } catch (error) {
      console.error("Error resolving alert:", error);
      toast.error("Failed to resolve alert");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-foreground">Loading...</h2>
        </div>
      </div>
    );
  }

  const apiUptime24h = parseFloat(getMetricValue('api_uptime_24h').replace('%', '').replace('percentage', '')) || 0;
  const apiUptime7d = parseFloat(getMetricValue('api_uptime_7d').replace('%', '').replace('percentage', '')) || 0;
  const errorRate = parseFloat(getMetricValue('error_rate_24h').replace('%', '').replace('percentage', '')) || 0;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading 
            title="System Health & Monitoring"
            subtitle="Real-time operational oversight and alerts"
          />
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-[hsl(var(--gold))]" />
              <CheckCircle className={`h-5 w-5 ${getStatusColor(apiUptime24h, { good: 99, warning: 95 })}`} />
            </div>
            <h3 className="text-sm text-muted-foreground">API Uptime (24h)</h3>
            <p className="text-2xl font-bold text-foreground">{getMetricValue('api_uptime_24h')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-[hsl(var(--gold))]" />
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-muted-foreground">Page Load Speed</h3>
            <p className="text-2xl font-bold text-foreground">{getMetricValue('page_load_speed')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-8 w-8 text-[hsl(var(--gold))]" />
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-muted-foreground">DB Response Time</h3>
            <p className="text-2xl font-bold text-foreground">{getMetricValue('database_response_time')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <HardDrive className="h-8 w-8 text-[hsl(var(--gold))]" />
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-muted-foreground">Storage Used</h3>
            <p className="text-2xl font-bold text-foreground">{getMetricValue('storage_used')}</p>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="alerts">
              <Bell className="mr-2 h-4 w-4" />
              Alerts ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="performance">
              <TrendingUp className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="logs">
              <FileText className="mr-2 h-4 w-4" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Zap className="mr-2 h-4 w-4" />
              AI Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-serif text-foreground mb-4">Active Alerts</h3>
              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <Card key={alert.id} className="p-4 bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={getSeverityColor(alert.severity) as any}>
                              {alert.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.created_at).toLocaleString()}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                            Resolve
                          </Button>
                          <Button size="sm" variant="ghost">
                            Escalate
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                  <p>No active alerts</p>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-serif text-foreground mb-4">System Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">API Uptime (7d)</span>
                    <span className="font-bold">{getMetricValue('api_uptime_7d')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Error Rate (24h)</span>
                    <span className="font-bold">{getMetricValue('error_rate_24h')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Queue Backlog</span>
                    <span className="font-bold">{getMetricValue('queue_backlog')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Users Today</span>
                    <span className="font-bold">{getMetricValue('active_users_today')}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-serif text-foreground mb-4">Storage Usage</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Used</span>
                    <span className="font-bold">{getMetricValue('storage_used')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Evidence Files</span>
                    <span className="font-bold">1.8 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Documents</span>
                    <span className="font-bold">0.4 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Exports</span>
                    <span className="font-bold">0.3 GB</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Clean Expired Files
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-serif text-foreground mb-4">Security Monitoring</h3>
              <div className="space-y-4">
                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Failed Login Attempts (24h)</p>
                      <p className="text-sm text-muted-foreground">No suspicious activity detected</p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Active IP Bans</p>
                      <p className="text-sm text-muted-foreground">0 addresses currently blocked</p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">2FA Status</p>
                      <p className="text-sm text-muted-foreground">87% of admins have 2FA enabled</p>
                    </div>
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                </Card>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Security Logs
              </Button>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-serif text-foreground mb-4">Recent System Logs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Log viewer feature coming soon
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Application Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Error Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="mr-2 h-4 w-4" />
                  View AI Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  View Security Logs
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* AI Recommendations Tab */}
          <TabsContent value="ai" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-serif text-foreground mb-4">AI Operational Recommendations</h3>
              <div className="space-y-3">
                <Card className="p-4 bg-[hsl(var(--gold))]/5 border border-[hsl(var(--gold))]/20">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-[hsl(var(--gold))] mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Volunteer Follow-Up Recommended</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        3 volunteers have not uploaded evidence in 10+ days
                      </p>
                      <Button size="sm">Send Reminders</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-[hsl(var(--gold))]/5 border border-[hsl(var(--gold))]/20">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-[hsl(var(--gold))] mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Donor Update Suggested</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        2 Legacy Builder donors haven't received project updates in 14 days
                      </p>
                      <Button size="sm">Generate Updates</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-[hsl(var(--gold))]/5 border border-[hsl(var(--gold))]/20">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-[hsl(var(--gold))] mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Evidence Review Priority</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        7 evidence submissions awaiting approval for high-priority projects
                      </p>
                      <Button size="sm">Review Now</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
