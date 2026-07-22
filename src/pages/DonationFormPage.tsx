import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WORDING_VERSION = "donor-tx-confirm-1.0";
const MIN_MINOR = 50000; // £500
const LARGE_MINOR = 5_000_000; // £50,000 → suggest bank transfer

const formatGBP = (minor: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(minor / 100);

type Step = "details" | "confirm" | "route" | "instructions";

export const DonationFormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);

  const [amountGBP, setAmountGBP] = useState("");
  const [purpose, setPurpose] = useState("");
  const [frequency, setFrequency] = useState("one_time");
  const [notes, setNotes] = useState("");
  const [recognitionPreference, setRecognitionPreference] = useState("named");
  const [confirmTx, setConfirmTx] = useState(false);
  const [acceptFundingTerms, setAcceptFundingTerms] = useState(false);

  const [draftId, setDraftId] = useState<string | null>(null);
  const [transferReference, setTransferReference] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [gcAvailable, setGcAvailable] = useState<boolean | null>(null);
  const [gcMsg, setGcMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate(`/auth?portal=donor&returnTo=${encodeURIComponent("/donation-form")}`);
        return;
      }
      setUserId(session.user.id);
    });
    supabase.rpc("gocardless_enabled").then(({ data }) => setGcAvailable(Boolean(data)));
  }, [navigate]);

  const amountMinor = Math.round(parseFloat(amountGBP || "0") * 100);
  const operatingMinor = Math.floor((amountMinor * 20) / 100);
  const deliveryMinor = amountMinor - operatingMinor;
  const isLarge = amountMinor >= LARGE_MINOR;

  const proceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountMinor || amountMinor < MIN_MINOR) {
      toast({ title: "Minimum £500", description: "Please enter at least £500.", variant: "destructive" });
      return;
    }
    if (!purpose) {
      toast({ title: "Purpose required", variant: "destructive" });
      return;
    }
    setStep("confirm");
  };

  const createDraftAndConfirm = async () => {
    if (!confirmTx || !acceptFundingTerms) {
      toast({ title: "Please confirm the transaction details and accept the Donor and Project Funding Terms", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data: draft, error: draftErr } = await supabase.rpc("donation_draft_create", {
        _amount_minor: amountMinor,
        _frequency: frequency as any,
        _purpose: purpose as any,
        _proposed_project_id: null,
        _notes: notes || null,
        _recognition_preference: recognitionPreference,
        _anonymous: recognitionPreference === "anonymous",
      });
      if (draftErr) throw draftErr;
      const id = draft as unknown as string;

      // Server-side authoritative acceptance of the Donor and Project Funding Terms.
      const { error: acceptErr } = await supabase.rpc(
        "accept_donor_project_funding_terms" as any,
        { _draft_id: id },
      );
      if (acceptErr) throw acceptErr;

      const { error: confErr } = await supabase.rpc("donation_confirm_transaction", {
        _draft_id: id,
        _wording_version: WORDING_VERSION,
      });
      if (confErr) throw confErr;
      setDraftId(id);
      setStep("route");
    } catch (err: any) {
      toast({ title: "Unable to record submission", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const chooseGoCardless = async () => {
    if (!draftId) return;
    setLoading(true);
    setGcMsg(null);
    try {
      const { data, error } = await supabase.functions.invoke("gocardless-create-flow", {
        body: { draft_id: draftId },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setGcMsg(
        data?.message ||
          "Direct Debit setup is not yet available. You may use secure bank transfer or return later.",
      );
    } catch (err: any) {
      setGcMsg(
        "Direct Debit setup is not yet available. You may use secure bank transfer or return later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const chooseBankTransfer = async () => {
    if (!draftId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("donation_request_bank_transfer", { _draft_id: draftId });
      if (error) throw error;
      setTransferReference(data as unknown as string);
      const { data: bd } = await supabase.rpc("donor_get_bank_details", { _draft_id: draftId });
      const row = Array.isArray(bd) ? bd[0] : bd;
      if (row?.show_details) setBankDetails(row);
      setStep("instructions");
    } catch (err: any) {
      toast({ title: "Unable to request bank transfer", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Header />
      <main className="flex-grow">
        <div className="max-w-[820px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <span className="portal-eyebrow mb-4 block">Funding Submission</span>
          <h1
            className="text-foreground mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(30px, 3.2vw, 46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            Structured funding
          </h1>

          {step === "details" && (
            <form onSubmit={proceedToConfirm} className="portal-panel space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Funding amount (£)*</Label>
                <Input
                  id="amount"
                  type="number"
                  min="500"
                  step="1"
                  placeholder="500"
                  value={amountGBP}
                  onChange={(e) => setAmountGBP(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">Minimum £500. Amounts are held in whole pence.</p>
              </div>

              <div className="space-y-2">
                <Label>Funding purpose*</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger><SelectValue placeholder="Select a purpose" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare_access">Healthcare Access</SelectItem>
                    <SelectItem value="humanitarian_crisis">Humanitarian Crisis</SelectItem>
                    <SelectItem value="research_policy">Research &amp; Policy</SelectItem>
                    <SelectItem value="professional_education">Professional Education</SelectItem>
                    <SelectItem value="where_most_needed">Where Most Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Frequency*</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one_time">One-time</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recognition preference</Label>
                <Select value={recognitionPreference} onValueChange={setRecognitionPreference}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="named">Named</SelectItem>
                    <SelectItem value="private">Private (Trust records only)</SelectItem>
                    <SelectItem value="anonymous">Anonymous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>

              <Button type="submit" className="w-full h-12">Continue</Button>
            </form>
          )}

          {step === "confirm" && (
            <div className="portal-panel space-y-6">
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>Confirm allocation</h2>
              <div className="border border-foreground/15 divide-y divide-foreground/10 text-[15px]">
                <Row label="Gross funding" value={formatGBP(amountMinor)} />
                <Row label="Operating (20%)" value={formatGBP(operatingMinor)} />
                <Row label="Delivery (80%)" value={formatGBP(deliveryMinor)} />
                <Row label="Frequency" value={frequency.replace("_", "-")} />
                <Row label="Purpose" value={purpose.replace(/_/g, " ")} />
              </div>

              <div className="border border-foreground/15 p-4 text-[14px] leading-relaxed bg-muted/20">
                By confirming I acknowledge that this submission is a structured gift to Global Health Access Trust
                (a UK charitable trust). Funds are irrevocably applied under the Trust's 20% operating and
                80% delivery allocation model. I confirm the funds originate lawfully from me or an entity I
                control, and I authorise the Trust to process the amount stated.
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="confirmTx" checked={confirmTx} onCheckedChange={(v) => setConfirmTx(v as boolean)} />
                <label htmlFor="confirmTx" className="text-sm leading-relaxed cursor-pointer">
                  I confirm the amount, purpose and allocation shown above. *
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("details")} disabled={loading}>Back</Button>
                <Button onClick={createDraftAndConfirm} disabled={loading || !confirmTx} className="flex-1 h-12">
                  {loading ? "Recording…" : "Confirm and choose payment method"}
                </Button>
              </div>
            </div>
          )}

          {step === "route" && (
            <div className="portal-panel space-y-6">
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>Choose payment method</h2>
              {isLarge && (
                <Alert>
                  <AlertDescription>
                    For amounts of {formatGBP(LARGE_MINOR)} or above, bank transfer is preferred and avoids
                    processing fees on your gift.
                  </AlertDescription>
                </Alert>
              )}
              {gcMsg && (
                <Alert variant="destructive">
                  <AlertDescription>{gcMsg}</AlertDescription>
                </Alert>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex-col"
                  onClick={chooseGoCardless}
                  disabled={loading || gcAvailable === false}
                >
                  <span className="font-semibold">Direct Debit</span>
                  <span className="text-xs text-muted-foreground">
                    {gcAvailable === false ? "Not yet available" : "GoCardless-hosted authorisation"}
                  </span>
                </Button>
                <Button variant="outline" className="h-24 flex-col" onClick={chooseBankTransfer} disabled={loading}>
                  <span className="font-semibold">Bank transfer</span>
                  <span className="text-xs text-muted-foreground">Instructions issued with reference</span>
                </Button>
              </div>
              <Button variant="ghost" onClick={() => navigate("/donor-dashboard")}>Save and exit</Button>
            </div>
          )}

          {step === "instructions" && transferReference && (
            <div className="portal-panel space-y-6">
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>Bank transfer instructions</h2>
              <p className="text-[15px]">
                Your unique reference number is:
              </p>
              <div className="border border-foreground/25 p-6 text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Reference</div>
                <div className="font-mono text-xl">{transferReference}</div>
              </div>
              <div className="text-[15px] leading-relaxed">
                <p className="font-semibold mb-2">Please quote this reference on your transfer:</p>
                <ul className="space-y-1">
                  <li><strong>Beneficiary:</strong> {bankDetails?.beneficiary_name ?? "Global Health Access Trust"}</li>
                  {bankDetails?.bank_name && <li><strong>Bank:</strong> {bankDetails.bank_name}</li>}
                  {bankDetails?.sort_code && <li><strong>Sort code:</strong> {bankDetails.sort_code}</li>}
                  {bankDetails?.account_number && <li><strong>Account number:</strong> {bankDetails.account_number}</li>}
                  {bankDetails?.iban && <li><strong>IBAN:</strong> {bankDetails.iban}</li>}
                  {bankDetails?.bic && <li><strong>BIC:</strong> {bankDetails.bic}</li>}
                  <li><strong>Amount:</strong> {formatGBP(amountMinor)}</li>
                  <li><strong>Reference:</strong> {transferReference}</li>
                </ul>
                {!bankDetails && (
                  <p className="mt-4 text-muted-foreground text-sm">
                    Full bank details will be issued by the Trust's finance team by secure email to the
                    address on your donor account within one working day. Your gift will be reconciled and
                    confirmed once received. A bank-transfer instruction request is not a paid donation.
                  </p>
                )}
                {bankDetails && (
                  <p className="mt-4 text-muted-foreground text-sm">
                    Please do not omit the reference — it is required to reconcile your gift. Your donation
                    will be recorded only once funds are received and reconciled.
                  </p>
                )}
              </div>
              <Button onClick={() => navigate("/donor-dashboard")} className="w-full h-12">
                Return to Donor Portal
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between px-4 py-3">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default DonationFormPage;
