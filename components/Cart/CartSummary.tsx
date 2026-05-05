'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/hooks/useCart';

export default function CartSummary() {
  const { cart, clearCart } = useCart();

  const subtotal = cart.total;
  const tax = Number((subtotal * 0.1).toFixed(2)); // 10% tax
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit lg:sticky lg:top-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-3">
        Checkout
      </button>

      <button
        onClick={clearCart}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
      >
        Clear Cart
      </button>

      <Link href="/" className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-semibold">
        Continue Shopping
      </Link>
    </div>
  );
}
