import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const fmt = (minor: number | null | undefined, currency = "GBP") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency }).format((minor ?? 0) / 100);

export const AdminPaymentsPage = () => {
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<any[]>([]);
  const [bankRequests, setBankRequests] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [receiving, setReceiving] = useState<string | null>(null);
  const [amountGBP, setAmountGBP] = useState("");

  const load = async () => {
    const [{ data: d }, { data: b }, { data: a }] = await Promise.all([
      supabase.from("donation_drafts").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("bank_transfer_requests").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("payment_attempts").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setDrafts(d ?? []);
    setBankRequests(b ?? []);
    setAttempts(a ?? []);
  };

  useEffect(() => { load(); }, []);

  const recordReceipt = async (reqId: string) => {
    const minor = Math.round(parseFloat(amountGBP || "0") * 100);
    if (!minor) return toast({ title: "Enter amount received", variant: "destructive" });
    const { error } = await supabase.rpc("bank_transfer_record_receipt", {
      _request_id: reqId,
      _amount_minor_received: minor,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Receipt recorded" });
    setReceiving(null);
    setAmountGBP("");
    load();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Payment control</h1>
      <Tabs defaultValue="bank">
        <TabsList>
          <TabsTrigger value="bank">Bank transfers</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="attempts">Card attempts</TabsTrigger>
        </TabsList>

        <TabsContent value="bank">
          <Card>
            <CardHeader><CardTitle>Bank transfer requests</CardTitle></CardHeader>
            <CardContent>
              {bankRequests.length === 0 && <p className="text-sm text-muted-foreground">No requests.</p>}
              <div className="divide-y">
                {bankRequests.map((r) => (
                  <div key={r.id} className="py-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="font-mono">{r.reference_number}</div>
                        <div className="text-muted-foreground">
                          {fmt(r.amount_expected_minor, r.currency)} · {r.status} ·{" "}
                          {new Date(r.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        {receiving === r.id ? (
                          <div className="flex gap-2 items-end">
                            <div>
                              <Label className="text-xs">Received (£)</Label>
                              <Input value={amountGBP} onChange={(e) => setAmountGBP(e.target.value)} className="h-8 w-32" />
                            </div>
                            <Button size="sm" onClick={() => recordReceipt(r.id)}>Confirm</Button>
                            <Button size="sm" variant="ghost" onClick={() => setReceiving(null)}>Cancel</Button>
                          </div>
                        ) : (
                          r.status !== "reconciled" && (
                            <Button size="sm" onClick={() => { setReceiving(r.id); setAmountGBP((r.amount_expected_minor / 100).toString()); }}>
                              Record receipt
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader><CardTitle>Donation drafts</CardTitle></CardHeader>
            <CardContent>
              <div className="divide-y">
                {drafts.map((d) => (
                  <div key={d.id} className="py-3 text-sm flex justify-between">
                    <div>
                      <div>{fmt(d.amount_minor, d.currency)} · {d.purpose}</div>
                      <div className="text-muted-foreground text-xs">{d.status} · {new Date(d.created_at).toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{d.id.slice(0, 8)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attempts">
          <Card>
            <CardHeader><CardTitle>Card payment attempts</CardTitle></CardHeader>
            <CardContent>
              <div className="divide-y">
                {attempts.map((a) => (
                  <div key={a.id} className="py-3 text-sm flex justify-between">
                    <div>
                      <div>{fmt(a.amount_minor, a.currency)} · {a.provider} · {a.status}</div>
                      <div className="text-muted-foreground text-xs">{new Date(a.created_at).toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{(a.provider_session_id || "").slice(0, 20)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPaymentsPage;
