import { ContentLayout } from "@/components/layout/ContentLayout";
import { TrusteeBiographiesGrid } from "@/components/TrusteeBiographiesGrid";
import { SEO } from "@/components/SEO";

export const TrusteeBiographiesPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Trustee Biographies"
        description="Meet the Trustees of the Global Health Access Trust — senior professionals in healthcare leadership, public policy, governance, and international systems."
        canonical="/trustee-biographies"
      />
      <h1>Trustee Biographies</h1>
      
      <p className="text-lg mb-8">The Trust is governed by appointed Trustees who carry collective responsibility for charitable purpose, strategy, safeguarding, financial stewardship and institutional oversight. Their work is supported by specialist advisers where additional expertise is required.</p>

      <TrusteeBiographiesGrid />

      <p className="mt-8">A full register of trustee declarations, including interests and annual governance statements, is available upon request.</p>
      
      <p>Specialist contributors support the Trust in an advisory capacity and do not hold trustee authority unless separately appointed in accordance with the Constitution.</p>
    </ContentLayout>
  );
};
