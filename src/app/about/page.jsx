"use client";
import React from "react";
import Aboutpage from "./_component/aboutPage";

import Story from "./_component/story";
import Vision from "./_component/vision";
import Testimonial from "./_component/testinomials";
import Testimonialbanner from "./_component/testinomialsBanner";
import News from "../home/_component/news";
import { pageMetadata } from "../configs/seo.config";
import { usePageSEO } from "@/utils/useSEO";

export default function about() {
  usePageSEO({
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    keywords: pageMetadata.about.keywords,
  });

  return (
    <>
      <Aboutpage/>
      <Story/>
      <Vision/>
      <Testimonial/>
      <Testimonialbanner/>
      <News/>
    </>
  );
}
