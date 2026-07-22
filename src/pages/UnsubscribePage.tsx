import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/lib/seo";

type Status = "loading" | "ready" | "applied" | "already" | "invalid" | "expired" | "error";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    // Validate presence quickly (no side-effect until user confirms)
    void supabase
      .from("email_unsubscribe_public_tokens")
      .select("id, used_at, expires_at")
      .eq("token", token)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return setStatus("invalid");
        if (data.used_at) return setStatus("already");
        if (new Date(data.expires_at) < new Date()) return setStatus("expired");
        setStatus("ready");
      });
  }, [token]);

  const confirm = async () => {
    const { data, error } = await supabase.rpc("apply_unsubscribe_token", { _token: token });
    if (error) return setStatus("error");
    const res = data as { ok: boolean; reason: string } | null;
    if (!res) return setStatus("error");
    if (res.reason === "already_used") return setStatus("already");
    if (res.reason === "expired") return setStatus("expired");
    if (res.reason === "invalid") return setStatus("invalid");
    setStatus("applied");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Unsubscribe | Global Health Access Trust" canonical="/unsubscribe" />
      <Header />
      <main className="flex-grow max-w-xl mx-auto px-6 py-20 w-full">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Communications</p>
        <h1 className="text-4xl font-serif mb-6">Unsubscribe</h1>

        {status === "loading" && <p className="text-muted-foreground">Checking your link…</p>}

        {status === "ready" && (
          <>
            <p className="mb-6">
              Confirm that you would like to unsubscribe from this communication. This takes effect promptly and you do
              not need to sign in.
            </p>
            <Button onClick={confirm} className="h-12 min-w-[220px]">Confirm unsubscribe</Button>
          </>
        )}

        {status === "applied" && (
          <p>
            You have been unsubscribed. We will not use this address for this type of communication. Service messages
            related to your account or a donation may still be sent when legally required.
          </p>
        )}

        {status === "already" && <p>This link has already been used. No further action is needed.</p>}
        {status === "expired" && (
          <p>
            This link has expired. Please use the unsubscribe link in a more recent message, or contact us via{" "}
            <Link to="/contact-the-trust" className="underline">the contact route</Link>.
          </p>
        )}
        {status === "invalid" && (
          <p>
            This link is not valid. Please use the unsubscribe link in the message, or contact us via{" "}
            <Link to="/contact-the-trust" className="underline">the contact route</Link>.
          </p>
        )}
        {status === "error" && <p>Something went wrong. Please try again later.</p>}
      </main>
      <Footer />
    </div>
  );
};

export default UnsubscribePage;
