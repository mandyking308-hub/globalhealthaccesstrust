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
      
      <p className="text-lg mb-8">"The strength of a charitable trust lies in the integrity of its stewards. Our Trustees are senior professionals with decades of experience in healthcare leadership, public policy, governance, and international systems. Their duty is not only to guide the Trust, but to protect its mission—and the lives it exists to serve."</p>

      <TrusteeBiographiesGrid />

      <p className="mt-8">A full register of trustee declarations, including interests and annual governance statements, is available upon request.</p>
      
      <p>Only Mandy King, Dr. Jagdev Thukral, and John O'Sullivan currently act as operational signatories to the Trust's Constitution. The remaining trustees serve in an advisory or non-executive capacity.</p>
    </ContentLayout>
  );
};