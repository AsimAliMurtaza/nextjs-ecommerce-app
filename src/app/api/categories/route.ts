import dbConnect from '@/lib/db';
import Product from '@/models/Products';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    const categoriesSet = new Set(products.map((product) => product.category));

    const categories = Array.from(categoriesSet);
    const categoryDetails = {};

    categories.forEach(category => {
      const categoryProducts = products.filter(product => product.category === category);
      if (categoryProducts.length > 0) {
        categoryDetails[category] = {
          imageUrl: categoryProducts[0].imageUrl || "/placeholder.svg",
          description: categoryProducts[0].description || "Description not available",
        };
      }
    });

    return new Response(JSON.stringify({ categories, categoryDetails }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch categories' }), {
      status: 500,
    });
  }
}
