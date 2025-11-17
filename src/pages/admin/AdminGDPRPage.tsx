import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Trash2, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GDPRRequest {
  id: string;
  user_id: string | null;
  email: string;
  request_type: string;
  request_details: string;
  status: string;
  created_at: string;
  processed_at: string | null;
  processed_by: string | null;
}

interface RetentionSetting {
  id: string;
  setting_key: string;
  setting_value: number;
  description: string;
}

export const AdminGDPRPage = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<GDPRRequest[]>([]);
  const [retentionSettings, setRetentionSettings] = useState<RetentionSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<GDPRRequest | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [requestsRes, settingsRes] = await Promise.all([
        supabase
          .from("gdpr_requests")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("data_retention_settings")
          .select("*")
          .order("setting_key"),
      ]);

      if (requestsRes.error) throw requestsRes.error;
      if (settingsRes.error) throw settingsRes.error;

      setRequests(requestsRes.data || []);
      setRetentionSettings(settingsRes.data || []);
    } catch (error) {
      console.error("Error loading GDPR data:", error);
      toast({
        title: "Error",
        description: "Failed to load GDPR data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async (request: GDPRRequest) => {
    try {
      if (!request.user_id) {
        toast({
          title: "Cannot export",
          description: "This request is not associated with a user account",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.rpc("export_user_data", {
        target_user_id: request.user_id,
      });

      if (error) throw error;

      // Create downloadable JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `user_data_export_${request.user_id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Mark as processed
      await supabase
        .from("gdpr_requests")
        .update({
          status: "completed",
          processed_at: new Date().toISOString(),
        })
        .eq("id", request.id);

      toast({
        title: "Data Exported",
        description: "User data has been exported successfully",
      });

      loadData();
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Export Failed",
        description: "Your request could not be completed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteData = async () => {
    if (!selectedRequest?.user_id) return;

    try {
      const { error } = await supabase.rpc("anonymize_user_data", {
        target_user_id: selectedRequest.user_id,
      });

      if (error) throw error;

      // Mark request as completed
      await supabase
        .from("gdpr_requests")
        .update({
          status: "completed",
          processed_at: new Date().toISOString(),
        })
        .eq("id", selectedRequest.id);

      toast({
        title: "Data Deleted",
        description: "User data has been permanently anonymized",
      });

      setShowDeleteDialog(false);
      setSelectedRequest(null);
      loadData();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast({
        title: "Deletion Failed",
        description: "Your request could not be completed. A member of our team will review this shortly.",
        variant: "destructive",
      });
    }
  };

  const updateRetentionSetting = async (settingKey: string, newValue: number) => {
    try {
      const { error } = await supabase
        .from("data_retention_settings")
        .update({ setting_value: newValue })
        .eq("setting_key", settingKey);

      if (error) throw error;

      toast({
        title: "Setting Updated",
        description: "Retention period has been updated",
      });

      loadData();
    } catch (error) {
      console.error("Error updating retention setting:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update retention setting",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "completed":
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading GDPR tools...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">GDPR Compliance Tools</h1>
        <p className="text-muted-foreground">Manage data subject access requests and retention policies</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          All GDPR actions are irreversible and logged for audit purposes. Exercise caution when processing deletion requests.
        </AlertDescription>
      </Alert>

      {/* GDPR Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Data Subject Access Requests</CardTitle>
          <CardDescription>Requests from users to export or delete their personal data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No GDPR requests
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="text-sm">
                        {new Date(request.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{request.email}</TableCell>
                      <TableCell>
                        <Badge variant={request.request_type === "export" ? "default" : "destructive"}>
                          {request.request_type === "export" ? (
                            <><Download className="h-3 w-3 mr-1" />Export</>
                          ) : (
                            <><Trash2 className="h-3 w-3 mr-1" />Delete</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {request.request_details || "—"}
                      </TableCell>
                      <TableCell>
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            {request.request_type === "export" ? (
                              <Button
                                size="sm"
                                onClick={() => handleExportData(request)}
                                disabled={!request.user_id}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Export
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowDeleteDialog(true);
                                }}
                                disabled={!request.user_id}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Process
                              </Button>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Data Retention Policies</CardTitle>
          <CardDescription>Configure how long different types of data are retained</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {retentionSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{setting.description}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Current: {setting.setting_value} {setting.setting_key.includes("days") ? "days" : "months"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="365"
                    defaultValue={setting.setting_value}
                    className="w-20"
                    onBlur={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (newValue !== setting.setting_value) {
                        updateRetentionSetting(setting.setting_key, newValue);
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {setting.setting_key.includes("days") ? "days" : "months"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Data Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently anonymize all personal data for{" "}
              <strong>{selectedRequest?.email}</strong>. This action cannot be undone.
              <br /><br />
              The following will be deleted or anonymized:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Personal profile information</li>
                <li>Contact details</li>
                <li>Session data</li>
                <li>2FA settings</li>
                <li>Message content</li>
              </ul>
              <br />
              Project data will be anonymized to maintain integrity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
