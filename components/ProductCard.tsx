'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{product.title}</h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews || 0})</span>
            </div>
          )}

          {/* Price */}
          <p className="text-lg font-bold text-gray-900 mb-3">${product.price}</p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="mt-auto bg-[#08369b] hover:bg-[#072f88] disabled:opacity-60 text-white py-2 px-4 rounded-md font-semibold transition-colors"
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
