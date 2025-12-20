"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login"); 
    }
  }, [token, router]);

  if (!token) return null; 

  return <>{children}</>;
}
