// app/api/products/new/route.ts
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    // Get products added in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newProducts = await Product.find({
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });

    return NextResponse.json(newProducts);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch new products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
