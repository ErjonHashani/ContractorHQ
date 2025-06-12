// app/api/contact/messages/route.ts
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const FILE_PATH = path.join(process.cwd(), "messages.json");

export async function GET() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const messages = JSON.parse(data);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("❌ Failed to read messages:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array on failure
  }
}
