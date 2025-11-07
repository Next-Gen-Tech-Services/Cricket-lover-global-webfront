"use client";
import { useSearchParams } from "next/navigation";

import React from "react";
import Membership1 from "./_component/membership";
import MembershipBenefit from "./_component/membershipBenefit";
import PricingPlan from "./_component/pricingplan";
import SoloMembership from "./_component/solomembership";
import News from "../home/_component/news";
import PlatinumMembership from "./_component/platiummembership";  


export default function MainMembership() {
  const query = useSearchParams();
  const view = query.get("view");

  // ✅ If GET STARTED clicked → show only SoloMembership
  
  if (view === "solo") {
  return <SoloMembership />;
}

if (view === "platinum") {
  return <PlatinumMembership />;
}


  // ✅ Default Full Membership Page
  return (
    <>
      <Membership1 />
      <MembershipBenefit />
      <PricingPlan />
      {/* <RibbonOffer /> */}
      <News />
    </>
  );
}
