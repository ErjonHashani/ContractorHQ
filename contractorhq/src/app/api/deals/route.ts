import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const deals = await Product.find({ isOnSale: true });
    return NextResponse.json(deals);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch deals";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
