'use client';

import React from 'react';

interface FilterPriceProps {
  minPrice: number;
  maxPrice: number;
  selectedMin: number;
  selectedMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export default function FilterPrice({
  minPrice,
  maxPrice,
  selectedMin,
  selectedMax,
  onPriceChange,
}: FilterPriceProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onPriceChange(minPrice, newMax);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-white/95">Price</h3>

      <div className="space-y-3">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedMax}
          onChange={handleChange}
          className="w-full appearance-none rounded-full h-2 bg-white/35 accent-white cursor-pointer"
        />

        <div className="flex items-center justify-between text-lg text-white">
          <span>{selectedMin}</span>
          <span>{selectedMax}</span>
        </div>
      </div>
    </div>
  );
}
