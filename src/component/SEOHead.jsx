"use client";
import Head from "next/head";
import { siteConfig } from "@/app/configs/seo.config";

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = "website",
  noindex = false,
  canonical,
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const metaDescription = description || siteConfig.description;
  const metaKeywords = [...siteConfig.keywords, ...keywords].join(", ");
  const image = ogImage || siteConfig.ogImage;
  const canonicalUrl = canonical || siteConfig.url;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteConfig.url}${image}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteConfig.url}${image}`} />
      <meta name="twitter:creator" content="@cricketloversglobal" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
