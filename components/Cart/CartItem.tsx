'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { useCart } from '@/lib/hooks/useCart';

interface CartItemComponentProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 shrink-0 bg-gray-200 rounded-md overflow-hidden">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.product.title}</h3>
        <p className="text-gray-600 text-sm mb-2">${item.product.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Minus size={18} className="text-gray-600" />
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus size={18} className="text-gray-600" />
          </button>
          <span className="ml-auto font-semibold text-gray-800">
            ${(item.product.price * item.quantity).toFixed(2)}
          </span>
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="p-1 hover:bg-red-100 rounded ml-2"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
