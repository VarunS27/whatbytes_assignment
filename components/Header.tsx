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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-none">Logo</div>
            </Link>
          </div>

          {/* Centered Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/85">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-white/85 rounded-lg py-4 pl-14 pr-6 border border-white/55 focus:outline-none focus:ring-2 focus:ring-white/25"
                />
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Search"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/55 text-white"
            >
              <Search size={18} />
            </button>

            <div className="relative md:hidden">
              <Link
                href="/cart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/55 text-white"
              >
                <ShoppingCart size={18} />
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </div>

            <div className="md:hidden w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>

            <div className="relative hidden md:block">
              <Link
                href="/cart"
                className="flex items-center gap-3 bg-blue-950 hover:bg-blue-950 text-white px-7 py-2.5 rounded-lg"
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

            <div className="hidden md:flex w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
