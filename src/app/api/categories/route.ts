import dbConnect from '@/lib/db';
import Product from '@/models/Products';
import { NextResponse } from 'next/server';

interface CategoryDetail {
  imageUrl: string;
  description: string;
}

interface CategoryDetails {
  [key: string]: CategoryDetail;
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    const categoriesSet = new Set(products.map((product) => product.category));

    const categories = Array.from(categoriesSet);
    const categoryDetails: CategoryDetails = {};

    categories.forEach(category => {
      const categoryProducts = products.filter(product => product.category === category);
      if (categoryProducts.length > 0) {
        categoryDetails[category] = {
          imageUrl: categoryProducts[0].imageUrl || "/placeholder.svg",
          description: categoryProducts[0].description || "Description not available",
        };
      }
    });

    return NextResponse.json({ categories, categoryDetails });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
  }
}
