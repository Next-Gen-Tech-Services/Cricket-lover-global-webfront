"use client";
import React from 'react'
import Login from './_component/login'
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function Loginpage () {
  usePageSEO({
    title: pageMetadata.login.title,
    description: pageMetadata.login.description,
    keywords: pageMetadata.login.keywords,
  });

  return (
    <Login/>
  )
}
