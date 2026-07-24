import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  article?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  schema?: any;
}

export const SEO = ({ 
  title, 
  description, 
  canonical, 
  image = "/ghat-logo.png",
  type = "website",
  noindex = false,
  article,
  schema 
}: SEOProps) => {
  const siteUrl = "https://globalhealthaccesstrust.com";
  const fullTitle = title.includes("Global Health Access Trust") ? title : `${title} | Global Health Access Trust`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const safeDescription = description
    .replace("An unincorporated charitable organisation", "A charitable trust")
    .replace("an unincorporated charitable organisation", "a charitable trust");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* SEO directives */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Global Health Access Trust" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Article specific OG tags */}
      {article && type === "article" && (
        <>
          {article.author && <meta property="article:author" content={article.author} />}
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};