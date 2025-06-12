// app/api/products/categories/route.ts
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const categories = await Product.distinct("category");
  return NextResponse.json(categories);
}
