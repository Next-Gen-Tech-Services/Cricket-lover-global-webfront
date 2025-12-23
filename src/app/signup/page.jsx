"use client";
import React from 'react'
import Signup from './_component/signupPage'
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function Signuppage (){
  usePageSEO({
    title: pageMetadata.signup.title,
    description: pageMetadata.signup.description,
    keywords: pageMetadata.signup.keywords,
  });

  return (
    <Signup/>  
  )
}
