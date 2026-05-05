'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-[#08369b] text-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-4">
              <div className="text-4xl font-extrabold leading-none">Logo</div>
            </Link>
          </div>

          {/* Centered Search */}
          <div className="flex-1 flex justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-full py-4 pl-14 pr-6 shadow-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </form>
          </div>

          {/* Right Side - Cart + Avatar */}
          <div className="flex items-center gap-4 ml-6">
            <div className="relative">
              <Link
                href="/cart"
                className="flex items-center gap-3 bg-blue-900 hover:bg-blue-950 text-white px-5 py-3 rounded-full shadow-lg"
              >
                <ShoppingCart size={18} />
                <span className="font-semibold">Cart</span>
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </div>

            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
