import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// GET: Fetch a product by ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params; // ✅ await here
    await connectToDatabase();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in GET /api/products/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params; // ✅ await here
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete product";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params; // ✅ await here
    await connectToDatabase();
    const updates = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update product";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
