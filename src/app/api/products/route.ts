import dbConnect from '@/lib/db';
import Product from '@/models/Products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}
