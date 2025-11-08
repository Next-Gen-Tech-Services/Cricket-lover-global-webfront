"use client";
import { useSearchParams } from "next/navigation";

import React from "react";
import Membership1 from "./_component/membership";
import MembershipBenefit from "./_component/membershipBenefit";
import PricingPlan from "./_component/pricingplan";
import SoloMembership from "./_component/solomembership";
import News from "../home/_component/news";
import PlatinumMembership from "./_component/platiummembership";  
import ProtectedRoute from "@/component/protectroute";


export default function MainMembership() {
  const query = useSearchParams();
  const view = query.get("view");

  //  If GET STARTED clicked → show only SoloMembership
  
  if (view === "solo") {
  return <ProtectedRoute> <SoloMembership /></ProtectedRoute>;
}

if (view === "platinum") {
  return<ProtectedRoute> <PlatinumMembership /></ProtectedRoute>;
}


  // Default Full Membership Page
  return (
    <>
      <Membership1 />
      <MembershipBenefit />
      <ProtectedRoute>
      <PricingPlan />
      </ProtectedRoute>
      {/* <RibbonOffer /> */}
      <News />
    </>
  );
}
