'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full flex items-center justify-center py-16">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
