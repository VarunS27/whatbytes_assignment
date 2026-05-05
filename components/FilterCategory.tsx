'use client';

import React from 'react';

interface FilterCategoryProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function FilterCategory({
  categories,
  selectedCategories,
  onCategoryChange,
}: FilterCategoryProps) {
  const selectedCategory = selectedCategories[0] ?? 'All';

  return (
    <div className="mb-7">
      <h3 className="text-2xl font-semibold mb-4 text-white/95">Category</h3>
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer text-lg">
          <input
            type="radio"
            name="category"
            checked={selectedCategory === 'All'}
            onChange={() => onCategoryChange([])}
            className="h-5 w-5 border-2 border-white/60 bg-transparent text-blue-700 focus:ring-0"
          />
          <span className="text-white">All</span>
        </label>

        {categories.map((category) => (
          <label key={category} className="flex items-center gap-3 cursor-pointer text-lg">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category}
              onChange={() => onCategoryChange([category])}
              className="h-5 w-5 border-2 border-white/60 bg-transparent text-blue-700 focus:ring-0"
            />
            <span className="text-white">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
