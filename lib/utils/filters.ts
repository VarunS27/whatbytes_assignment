import { Product, Filters } from '../types';

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }

    // Price range filter
    const [minPrice, maxPrice] = filters.priceRange;
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesTitle = product.title.toLowerCase().includes(searchLower);
      const matchesDescription = product.description?.toLowerCase().includes(searchLower) ?? false;
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    // Brand filter
    if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand || '')) {
      return false;
    }

    return true;
  });
}

export function getUniqueBrands(products: Product[]): string[] {
  const brands = new Set<string>();
  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });
  return Array.from(brands).sort();
}

export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories).sort();
}

export function getMaxPrice(products: Product[]): number {
  return Math.max(...products.map((p) => p.price));
}
