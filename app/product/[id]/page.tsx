'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useToastStore } from '@/lib/stores/toastStore';
import { Product } from '@/lib/types';

export default function ProductDetail() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { addToCart } = useCart();
  const addToast = useToastStore((s) => s.addToast);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const productId = useMemo(() => {
    const rawParam = params.id;
    if (Array.isArray(rawParam)) {
      return rawParam[0] ?? '';
    }
    if (typeof rawParam === 'string' && rawParam.length > 0) {
      return rawParam;
    }

    const parts = pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? '';
  }, [params.id, pathname]);

  useEffect(() => {
    if (!productId) return;

    const controller = new AbortController();

    async function loadProduct() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          setProduct(null);
          return;
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch {
        if (!controller.signal.aborted) {
          setProduct(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    addToast('Added to cart', 'success');
    setTimeout(() => {
      setIsAdding(false);
      router.push('/cart');
    }, 1000);
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold">
          <ChevronLeft size={20} />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8">
          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                loading="eager"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
              </div>
            )}

            {/* Price */}
            <p className="text-4xl font-bold text-gray-900 mb-2">${product.price}</p>

            {/* Category */}
            {product.category && (
              <p className="text-gray-600 mb-6">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-16 text-center border border-gray-300 rounded-lg px-2 py-2"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-[#08369b] hover:bg-[#072f88] disabled:opacity-60 text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors mb-4"
            >
              {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            {/* Continue Shopping */}
            <Link href="/" className="text-center text-blue-600 hover:text-blue-700 font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
