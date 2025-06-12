// app/api/user/delete/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import { connectToDatabase } from "@/lib/db";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  try {
    const userId = session.user.id;

    await User.findByIdAndDelete(userId);
    await Order.deleteMany({ userId });

    return NextResponse.json({ message: "Account deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Failed to delete account --> ${err}` },
      { status: 500 }
    );
  }
}
