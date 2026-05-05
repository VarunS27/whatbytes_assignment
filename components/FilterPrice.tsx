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
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextMin = Number(e.target.value);
    if (nextMin <= selectedMax) {
      onPriceChange(nextMin, selectedMax);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextMax = Number(e.target.value);
    if (nextMax >= selectedMin) {
      onPriceChange(selectedMin, nextMax);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-white/95">Price</h3>

      <div className="space-y-3">
        <div className="relative h-6">
          <div className="absolute top-1/2 -translate-y-1/2 h-2 w-full rounded-full bg-white/35" />

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedMin}
            onChange={handleMinChange}
            aria-label="Minimum price"
            className="pointer-events-none absolute inset-0 z-20 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
          />

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedMax}
            onChange={handleMaxChange}
            aria-label="Maximum price"
            className="pointer-events-none absolute inset-0 z-30 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
          />
        </div>

        <div className="flex items-center justify-between text-lg text-white">
          <span>{selectedMin}</span>
          <span>{selectedMax}</span>
        </div>
      </div>
    </div>
  );
}
