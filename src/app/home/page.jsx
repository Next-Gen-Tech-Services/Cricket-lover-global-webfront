"use client";
import { FileSearch } from "lucide-react";
import Home from "./_component/homepage";
import News from "./_component/news";
import Passion1 from "./_component/passion1";
import Passion2 from "./_component/passion2";
import Testinomials from "./_component/testinomial";
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

function Main() {
  usePageSEO({
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    keywords: pageMetadata.home.keywords,
  });

  return (
    <>
    <Home/>
    <Testinomials/>
    <Passion1/>
    <Passion2/>
    <News/>
    </>
  );
}

export default Main;
