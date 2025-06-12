import mongoose from "mongoose";

// Fetch MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

// Cache the connection (using `const` + type assertion)
const cached = 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).mongoose || 
  { conn: null, promise: null } as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

export const connectToDatabase = async () => {
  // If there's an existing connection, return it
  if (cached.conn) return cached.conn;

  // Otherwise, create a new connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
