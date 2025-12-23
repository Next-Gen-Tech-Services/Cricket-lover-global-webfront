"use client";
import React, { useState } from "react";

const COUNTRIES = [
  { value: "England", label: "🇬🇧 England" },
  { value: "India", label: "🇮🇳 India" },
  { value: "Australia", label: "🇦🇺 Australia" },
  { value: "Pakistan", label: "🇵🇰 Pakistan" },
  { value: "South Africa", label: "🇿🇦 South Africa" },
  { value: "New Zealand", label: "🇳🇿 New Zealand" },
  { value: "Sri Lanka", label: "🇱🇰 Sri Lanka" },
  { value: "West Indies", label: "🌴 West Indies" },
  { value: "Bangladesh", label: "🇧🇩 Bangladesh" },
  { value: "Afghanistan", label: "🇦🇫 Afghanistan" },
  { value: "Ireland", label: "🇮🇪 Ireland" },
  { value: "Zimbabwe", label: "🇿🇼 Zimbabwe" },
];

const SIZES = Array.from({ length: 19 }, (_, i) => {
  const size = 22 + (i * 2);
  return { value: size.toString(), label: size.toString() };
});

export default function TshirtCustomization({ quantity, items, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    onChange(updatedItems);
  };

  return (
    <div className="mt-3 space-y-3">
      <p className="text-xs font-semibold text-gray-700 mb-2">
        Select size and country for each T-shirt:
      </p>
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
        >
          <span className="text-xs font-medium text-gray-600 min-w-[60px]">
            T-shirt #{index + 1}:
          </span>
          
          {/* Country Selector */}
          <select
            value={items[index]?.country || ""}
            onChange={(e) => handleItemChange(index, "country", e.target.value)}
            className="flex-1 text-xs border border-gray-300 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Country</option>
            {COUNTRIES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>

          {/* Size Selector */}
          <select
            value={items[index]?.size || ""}
            onChange={(e) => handleItemChange(index, "size", e.target.value)}
            className="flex-1 text-xs border border-gray-300 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Chest Size</option>
            {SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
