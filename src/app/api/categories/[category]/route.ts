import dbConnect from '@/lib/db';
import Product from '@/models/Products';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  const { category } = params;

  try {
    await dbConnect();

    const products = await Product.find({ category });

    if (products.length === 0) {
      return NextResponse.json({ message: 'No products found in this category' }, { status: 404 });
    }

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}
