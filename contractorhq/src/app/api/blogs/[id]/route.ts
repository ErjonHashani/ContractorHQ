/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/db";
import { Blog } from "@/lib/models/Blogs";
import { NextRequest, NextResponse } from "next/server";

// GET /api/blogs/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH /api/blogs/[id]
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updates = await req.json();
    await connectToDatabase();
    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return updatedBlog
      ? NextResponse.json(updatedBlog)
      : NextResponse.json({ error: "Blog not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/blogs/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const deletedBlog = await Blog.findByIdAndDelete(id);

    return deletedBlog
      ? NextResponse.json({ message: "Blog deleted" })
      : NextResponse.json({ error: "Blog not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
