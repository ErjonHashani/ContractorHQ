import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!validator.isEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!isStrong) {
    return NextResponse.json(
      {
        error:
          "Password must be 8+ characters and include uppercase, lowercase, number, and special character.",
      },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = new User({ name, email, password: hashed, role: "user" });
  await user.save();

  return NextResponse.json({ message: "User created" });
}
