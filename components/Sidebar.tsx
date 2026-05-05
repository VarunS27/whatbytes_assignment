'use client';

import React from 'react';
import FilterCategory from './FilterCategory';
import FilterPrice from './FilterPrice';

interface SidebarProps {
  categories: string[];
  maxPrice: number;
  selectedCategories: string[];
  selectedPriceRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (min: number, max: number) => void;
}

export default function Sidebar({
  categories,
  maxPrice,
  selectedCategories,
  selectedPriceRange,
  onCategoryChange,
  onPriceChange,
}: SidebarProps) {
  return (
    <div className="w-full lg:w-72 rounded-2xl bg-[#08369b] p-6 text-white shadow-xl h-fit lg:sticky lg:top-20">
      <h2 className="text-3xl font-bold mb-6">Filters</h2>

      <FilterCategory
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
      />

      <FilterPrice
        minPrice={0}
        maxPrice={maxPrice}
        selectedMin={selectedPriceRange[0]}
        selectedMax={selectedPriceRange[1]}
        onPriceChange={onPriceChange}
      />
    </div>
  );
}
