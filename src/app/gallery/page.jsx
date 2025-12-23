"use client";
import React from 'react'
import Gallery1 from './_component/gallery1'
import Gallery2 from './_component/gallery2'
import News from '../home/_component/news'
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function Gallerypage (){
  usePageSEO({
    title: pageMetadata.gallery.title,
    description: pageMetadata.gallery.description,
    keywords: pageMetadata.gallery.keywords,
  });

  return (
    <>
<Gallery1/>
{/* <Gallery2/> */}
<News/> 
</> )
}
