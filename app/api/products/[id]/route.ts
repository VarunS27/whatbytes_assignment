import { products } from '@/lib/data/products';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return Response.json(product);
}
