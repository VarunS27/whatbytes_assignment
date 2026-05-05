'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/lib/data/products';
import { getUniqueCategories, getMaxPrice } from '@/lib/utils/filters';
import { Product } from '@/lib/types';

function parsePriceRange(value: string | null, maxPrice: number): [number, number] {
  if (!value) {
    return [0, maxPrice];
  }

  const [rawMin, rawMax] = value.split('-');
  const parsedMin = Number(rawMin);
  const parsedMax = Number(rawMax);

  const min = Number.isFinite(parsedMin) ? Math.max(0, parsedMin) : 0;
  const max = Number.isFinite(parsedMax) ? Math.min(maxPrice, parsedMax) : maxPrice;

  return [min, max];
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => getUniqueCategories(products), []);
  const maxPrice = useMemo(() => getMaxPrice(products), []);
  const sidebarCategories = useMemo(() => [...categories, 'Home'], [categories]);

  const selectedCategoryParam = searchParams.get('category') ?? '';
  const selectedCategory = sidebarCategories.find(
    (category) => category.toLowerCase() === selectedCategoryParam.toLowerCase()
  );
  const selectedCategories = selectedCategory ? [selectedCategory] : [];
  const selectedPriceRange = parsePriceRange(searchParams.get('price'), maxPrice);

  useEffect(() => {
    const controller = new AbortController();
    const query = searchParams.toString();

    async function loadProducts() {
      setIsLoading(true);
      try {
        const endpoint = query ? `/api/products?${query}` : '/api/products';
        const response = await fetch(endpoint, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: { products: Product[] } = await response.json();
        setFetchedProducts(data.products);
      } catch {
        if (!controller.signal.aborted) {
          setFetchedProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [searchParams]);

  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    router.replace(query ? `/?${query}` : '/');
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    const selected = selectedCategories[0];
    updateQueryParams({
      category: selected ? selected.toLowerCase() : null,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    updateQueryParams({
      price: `${min}-${max}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Listing</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              categories={sidebarCategories}
              maxPrice={maxPrice}
              selectedCategories={selectedCategories}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={fetchedProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
