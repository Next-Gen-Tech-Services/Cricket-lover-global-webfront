"use client";
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div 
        className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl p-6 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
