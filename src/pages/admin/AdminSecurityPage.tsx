import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditLogViewer } from "@/components/admin/AuditLogViewer";
import { SessionManager } from "@/components/security/SessionManager";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AdminSecurityPage = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">Security Center</h1>
        <p className="text-muted-foreground">Monitor and manage platform security</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            
            Overview
          </TabsTrigger>
          <TabsTrigger value="audit">
            
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="sessions">
            
            Active Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Password Policy</CardTitle>
                <CardDescription>Current requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimum length</span>
                  <span className="font-medium">10 characters</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uppercase required</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Number required</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Symbol required</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Common passwords</span>
                  <span className="font-medium">Blocked</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Session Security</CardTitle>
                <CardDescription>Timeout settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inactivity timeout</span>
                  <span className="font-medium">45 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maximum session</span>
                  <span className="font-medium">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Secure cookies</span>
                  <span className="font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-logout on change</span>
                  <span className="font-medium">Enabled</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Rate Limiting</CardTitle>
                <CardDescription>Protection thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Login attempts</span>
                  <span className="font-medium">5 per minute</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Signup attempts</span>
                  <span className="font-medium">3 per minute</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Upload rate</span>
                  <span className="font-medium">5 per minute</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Block duration</span>
                  <span className="font-medium">10 minutes</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif">File Upload Security</CardTitle>
              <CardDescription>Size limits and validation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Photos</div>
                  <div className="font-medium">Max 5MB</div>
                  <div className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Documents</div>
                  <div className="font-medium">Max 10MB</div>
                  <div className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Videos</div>
                  <div className="font-medium">Max 50MB</div>
                  <div className="text-xs text-muted-foreground mt-1">MP4, MOV, AVI</div>
                </div>
              </div>
              <Alert className="mt-4">
                
                <AlertDescription>
                  All uploads are validated for file type, scanned, and stored with encryption
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif">Security Headers</CardTitle>
              <CardDescription>Platform-wide protections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">X-Frame-Options</span>
                <span className="font-mono text-xs">DENY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">X-XSS-Protection</span>
                <span className="font-mono text-xs">1; mode=block</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">X-Content-Type-Options</span>
                <span className="font-mono text-xs">nosniff</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Referrer-Policy</span>
                <span className="font-mono text-xs">strict-origin-when-cross-origin</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogViewer />
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Active Sessions</CardTitle>
              <CardDescription>
                View and manage all active user sessions across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SessionManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
