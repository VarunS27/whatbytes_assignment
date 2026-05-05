import { products } from '@/lib/data/products';

function parsePriceRange(price?: string): { min: number; max: number } {
  if (!price) {
    return { min: 0, max: Number.MAX_SAFE_INTEGER };
  }

  const [rawMin, rawMax] = price.split('-');
  const min = Number(rawMin);
  const max = Number(rawMax);

  return {
    min: Number.isFinite(min) ? min : 0,
    max: Number.isFinite(max) ? max : Number.MAX_SAFE_INTEGER,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category')?.trim().toLowerCase();
  const search = searchParams.get('search')?.trim().toLowerCase();
  const price = searchParams.get('price')?.trim();
  const { min, max } = parsePriceRange(price);

  const filtered = products.filter((product) => {
    if (category && product.category.toLowerCase() !== category) {
      return false;
    }

    if (product.price < min || product.price > max) {
      return false;
    }

    if (search) {
      const titleMatch = product.title.toLowerCase().includes(search);
      const descriptionMatch = product.description?.toLowerCase().includes(search) ?? false;
      if (!titleMatch && !descriptionMatch) {
        return false;
      }
    }

    return true;
  });

  return Response.json({
    products: filtered,
    total: filtered.length,
  });
}
