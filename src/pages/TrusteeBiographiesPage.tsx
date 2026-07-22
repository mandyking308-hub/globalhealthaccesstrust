import { ContentLayout } from "@/components/layout/ContentLayout";
import { TrusteeBiographiesGrid } from "@/components/TrusteeBiographiesGrid";
import { SEO } from "@/components/SEO";

export const TrusteeBiographiesPage = () => (
  <ContentLayout>
    <SEO
      title="Trustees"
      description="The current Trustees and specialist advisers of Global Health Access Trust."
      canonical="/trustee-biographies"
    />
    <h1>Trustees</h1>
    <p className="text-lg mb-8">
      Global Health Access Trust is administered by three Trustees. The Trustees retain collective responsibility for charitable purpose, banking, financial stewardship, risk, safeguarding and project approval.
    </p>

    <TrusteeBiographiesGrid />

    <div className="section-container mt-10">
      <h2>Governance records</h2>
      <p>
        Trustee decisions, declarations of interest, banking authorities and material approvals are maintained in the Trust's private governance records. Appropriate evidence may be provided to banks, professional advisers and regulators through a controlled due-diligence process.
      </p>
    </div>
  </ContentLayout>
);
