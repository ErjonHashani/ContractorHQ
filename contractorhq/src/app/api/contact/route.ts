// app/api/contact/route.ts
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const FILE_PATH = path.join(process.cwd(), "messages.json");

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const newEntry = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    // Load existing messages
    let messages = [];
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      messages = JSON.parse(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // No file yet — that's fine
    }

    messages.push(newEntry);

    // Write updated array
    await fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to save message:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
