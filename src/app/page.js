'use client';
import Mainpage from "./home/page";
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "./configs/seo.config";

export default function Main() {
  usePageSEO({
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    keywords: pageMetadata.home.keywords,
  });

  return (
    <div >
      <Mainpage/>
     
    </div>
  );
}
