"use client";
import React from 'react'
import PaymentSuccess from './_component/successpage'
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function Payment() {
  usePageSEO({
    title: pageMetadata.paymentSuccess.title,
    description: pageMetadata.paymentSuccess.description,
    keywords: pageMetadata.paymentSuccess.keywords,
  });

  return (
    <PaymentSuccess/>
     )
}
