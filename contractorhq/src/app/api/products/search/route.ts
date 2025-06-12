/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.trim();
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    await connectToDatabase();

    const filters: any = {};

    // Smart search across fields
    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }, // only if you have this field
      ];
    }

    if (brand) {
      filters.brand = brand;
    }

    if (category) {
      filters.category = category;
    }

    const products = await Product.find(filters).limit(100);

    return NextResponse.json(products);
  } catch (err: any) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
