'use client';

import React from 'react';
import { X } from 'lucide-react';
import FilterCategory from './FilterCategory';
import FilterPrice from './FilterPrice';

interface SidebarProps {
  categories: string[];
  maxPrice: number;
  selectedCategories: string[];
  selectedPriceRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (min: number, max: number) => void;
  mobileOnly?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  categories,
  maxPrice,
  selectedCategories,
  selectedPriceRange,
  onCategoryChange,
  onPriceChange,
  mobileOnly = false,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const selectedCategory = selectedCategories[0] ?? 'All';
  const selectedMaxPrice = Math.max(0, Math.min(maxPrice, selectedPriceRange[1]));

  const renderFilterCards = (mode: 'desktop' | 'mobile') => (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#08369b] p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Filters</h2>

        <FilterCategory
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          name={mode === 'mobile' ? 'primary-category-mobile' : 'primary-category-desktop'}
        />

        <FilterPrice
          minPrice={0}
          maxPrice={maxPrice}
          selectedMin={selectedPriceRange[0]}
          selectedMax={selectedPriceRange[1]}
          onPriceChange={onPriceChange}
        />
      </div>

      <div className="rounded-xl bg-white p-6 text-slate-900 shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold mb-5">Category</h3>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 text-xl cursor-pointer">
            <input
              type="radio"
              name={mode === 'mobile' ? 'secondary-category-mobile' : 'secondary-category-desktop'}
              checked={selectedCategory === 'All'}
              onChange={() => onCategoryChange([])}
              className="h-5 w-5"
            />
            <span>All</span>
          </label>

          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 text-xl cursor-pointer">
              <input
                type="radio"
                name={mode === 'mobile' ? 'secondary-category-mobile' : 'secondary-category-desktop'}
                checked={selectedCategory === category}
                onChange={() => onCategoryChange([category])}
                className="h-5 w-5"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>

        <h4 className="text-2xl font-bold mb-4">Price</h4>
        <input
          type="number"
          min={0}
          max={maxPrice}
          value={selectedMaxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (Number.isFinite(value)) {
              const boundedValue = Math.max(0, Math.min(maxPrice, value));
              onPriceChange(0, boundedValue);
            }
          }}
          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xl text-slate-800"
        />
      </div>
    </div>
  );

  if (mobileOnly) {
    if (!mobileOpen) {
      return null;
    }

    return (
      <div className="lg:hidden fixed inset-0 z-50">
        <button
          type="button"
          aria-label="Close filters"
          onClick={onMobileClose}
          className="absolute inset-0 bg-black/50"
        />

        <div className="absolute bottom-0 left-0 right-0 h-[70vh] overflow-y-auto rounded-t-2xl bg-slate-900 p-4">
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-slate-600" />

          <div className="mb-4 flex items-center justify-between text-white">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <button
              type="button"
              aria-label="Close filters"
              onClick={onMobileClose}
              className="rounded-full bg-slate-700 p-2"
            >
              <X size={18} />
            </button>
          </div>

          {renderFilterCards('mobile')}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-full lg:w-72 h-fit lg:sticky lg:top-20">
      {renderFilterCards('desktop')}
    </div>
  );
}
