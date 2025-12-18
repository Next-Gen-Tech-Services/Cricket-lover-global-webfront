"use client";
import Link from "next/link";
import { X } from "lucide-react";

export default function ProfileReminderPopup({ isOpen, onClose, percent }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Box */}
      <div className="relative bg-white rounded-xl w-[90%] max-w-md p-6 z-10 shadow-xl">
        
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-2">
          Complete Your Profile
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Your profile is only <b>{percent}%</b> complete.
          Complete it to unlock all features.
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-600 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/profile"
          className="block text-center bg-green-600 hover:bg-green-700
          text-white py-2 rounded-lg font-semibold"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
}
