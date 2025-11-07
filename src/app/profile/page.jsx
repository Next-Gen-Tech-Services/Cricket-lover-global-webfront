"use client";
import React from "react";
import ProfileSidebar from "./profilesidebar";
import ProfileImageUpload from "./profileimage";
import ProfileForm from "./profileform";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB] flex transition-all">

      <ProfileSidebar />

      <main className="flex-1 p-4 md:p-10 animate-fadeIn">
        
        {/* Premium Header */}

        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 
          border border-white/20 shadow-2xl rounded-2xl p-8 md:p-12 mt-3">

          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <ProfileImageUpload />
          </div>

          <ProfileForm />
        </div>

      </main>
    </div>
  );
}
