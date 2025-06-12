import { getServerSession } from "next-auth";
import User, { IUser } from "@/lib/models/User";
import { connectToDatabase } from "@/lib/db";
import UserProfileClient from "@/components/auth/UserProfileClient";
import mongoose from "mongoose";

type SafeUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

export default async function UserProfilePage() {
  await connectToDatabase();

  const session = await getServerSession();

  if (!session?.user?.email) {
    return (
      <main className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-gray-7 font-semibold">
          Please log in to view your profile.
        </p>
      </main>
    );
  }

  const user = await User.findOne({ email: session.user.email })
    .lean<
      Pick<IUser, "name" | "email" | "role"> & {
        _id: mongoose.Types.ObjectId;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >()
    .exec();

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-red-600 font-semibold">User not found.</p>
      </main>
    );
  }

  const safeUser: SafeUser = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    ...(user.createdAt && { createdAt: user.createdAt.toISOString() }),
    ...(user.updatedAt && { updatedAt: user.updatedAt.toISOString() }),
  };

  return <UserProfileClient user={safeUser} />;
}
