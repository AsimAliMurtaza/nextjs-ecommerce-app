import dbConnect from "@/lib/db";
import Product from "@/models/Products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
