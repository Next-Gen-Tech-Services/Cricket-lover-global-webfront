"use client";
import React from 'react'
import PaymentCancel from './_component/cancelpage'
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";

export default function Payment() {
  usePageSEO({
    title: pageMetadata.paymentCancel?.title || "Payment Cancelled",
    description: pageMetadata.paymentCancel?.description || "Your payment was cancelled",
    keywords: pageMetadata.paymentCancel?.keywords || "payment cancelled, cricket lover",
  });

  return (
    <PaymentCancel/>
  )
}
