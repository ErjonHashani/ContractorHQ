// app/shop/page.tsx

import ShopPageClient from "@/components/pages/ShopPageClient";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  brand: string;
  category: string;
}

async function getProducts(category?: string): Promise<Product[]> {
  let endpoint = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products`;
  if (category === "deals")
    endpoint = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/deals`;
  else if (category === "new")
    endpoint = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products/new`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

interface Props {
  searchParams: Promise<{ category?: string | string[] }>;
}

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;

  const categoryParam = params?.category;
  const category = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam ?? "all";

  const products = await getProducts(category);

  return <ShopPageClient products={products} initialCategory={category} />;
}
