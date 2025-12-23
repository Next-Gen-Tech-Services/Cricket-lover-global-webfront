"use client";
import { useEffect } from "react";
import { siteConfig } from "@/app/configs/seo.config";

export function usePageSEO({ title, description, keywords = [], ogImage, canonical }) {
  useEffect(() => {
    // Update document title
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
    document.title = fullTitle;

    // Update meta description
    const metaDescription = description || siteConfig.description;
    updateMetaTag("name", "description", metaDescription);
    
    // Update keywords
    const metaKeywords = [...siteConfig.keywords, ...keywords].join(", ");
    updateMetaTag("name", "keywords", metaKeywords);

    // Update Open Graph tags
    updateMetaTag("property", "og:title", fullTitle);
    updateMetaTag("property", "og:description", metaDescription);
    updateMetaTag("property", "og:image", `${siteConfig.url}${ogImage || siteConfig.ogImage}`);
    updateMetaTag("property", "og:url", canonical || window.location.href);
    
    // Update Twitter Card tags
    updateMetaTag("name", "twitter:title", fullTitle);
    updateMetaTag("name", "twitter:description", metaDescription);
    updateMetaTag("name", "twitter:image", `${siteConfig.url}${ogImage || siteConfig.ogImage}`);
    
    // Update canonical link
    updateCanonicalLink(canonical || window.location.href);
  }, [title, description, keywords, ogImage, canonical]);
}

function updateMetaTag(attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute("content", content);
}

function updateCanonicalLink(href) {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  
  link.setAttribute("href", href);
}
