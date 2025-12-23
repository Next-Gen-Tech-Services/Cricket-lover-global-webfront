"use client";

import News from "../home/_component/news";
import Care1 from "./_component/care1";
import Care2 from "./_component/care2";
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function CaresPage() {
  usePageSEO({
    title: pageMetadata.cares.title,
    description: pageMetadata.cares.description,
    keywords: pageMetadata.cares.keywords,
  });

  return (
    <div>
      <Care1 />
      <Care2/>
      <News/>
      
    </div>
  );
}
