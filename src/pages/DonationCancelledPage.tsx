import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const DonationCancelledPage = () => {
  const [params] = useSearchParams();
  const draftId = params.get("draft") || params.get("draft_id");

  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Helmet>
        <title>Payment cancelled | Global Health Access Trust</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <div className="max-w-[820px] mx-auto px-6 md:px-10 py-24">
          <span className="portal-eyebrow mb-4 block">Payment not completed</span>
          <h1 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>Payment cancelled</h1>
          <p className="text-[16px] leading-relaxed mb-8">
            No payment was taken. Your draft has been saved and remains available in the Donor Portal. You may resume, choose bank transfer, or leave it for later.
          </p>
          <div className="flex gap-3">
            <Button asChild><Link to="/donation-form">Try again</Link></Button>
            <Button asChild variant="outline"><Link to="/donor-dashboard">Donor Portal</Link></Button>
          </div>
          {draftId && <p className="text-xs text-muted-foreground mt-8">Draft: {draftId}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationCancelledPage;
