import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const DonationSuccessPage = () => {
  const [params] = useSearchParams();
  const draftId = params.get("draft") || params.get("draft_id") || params.get("session_id");

  useEffect(() => {
    document.title = "Thank you — Global Health Access Trust";
  }, []);

  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Header />
      <main className="flex-grow">
        <div className="max-w-[820px] mx-auto px-6 md:px-10 py-24">
          <span className="portal-eyebrow mb-4 block">Confirmation</span>
          <h1 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>Thank you.</h1>
          <p className="text-[16px] leading-relaxed mb-6">
            Your submission has been received. The Trust will confirm settlement and issue formal acknowledgement to the email address on your donor account.
          </p>
          {draftId && <p className="text-xs text-muted-foreground mb-8">Reference: {draftId}</p>}
          <Button asChild><Link to="/donor-dashboard">Return to Donor Portal</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationSuccessPage;
