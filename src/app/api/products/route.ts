import dbConnect from '@/lib/db';
import Product from '@/models/Products';

export async function GET({req}: {req: Request}): Promise<Response> {
  try {
    await dbConnect();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch products' }), {
      status: 500,
    });
  }
}
