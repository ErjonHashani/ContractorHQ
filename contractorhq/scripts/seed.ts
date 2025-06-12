import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import fs from "fs";

async function seed() {
  try{
  await connectToDatabase();

  const products = JSON.parse(
    fs.readFileSync("scripts/products.json", "utf-8")
  );

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log("✅ Seeded products to MongoDB");
  process.exit();
  }catch(error){
    console.log("❌Error during seeding: ",error);
    process.exit();
  }
}

seed();
