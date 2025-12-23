"use client";
import React from 'react'
import Contact from './_component/contact'
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function  Contactpage () {
  usePageSEO({
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    keywords: pageMetadata.contact.keywords,
  });

  return (
    <Contact/>
  )
}
