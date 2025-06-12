import { HeroSection } from "@/components/ui/HeroSection";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/ui/FeaturedProducts";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  category: string;
}

export const metadata = {
  title: "ContractorHQ | Home",
  description: "The best contractor-grade tools and equipment",
  robots: "index, follow",
  openGraph: {
    title: "ContractorHQ | Home",
    description: "Find the best contractor-grade tools and equipment here",
    images: ["/images/hero/hero-1.png"],
  },
};

export default async function Home() {
  let products: Product[] = [];

  try {
    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL;

    const res = await fetch(`${baseURL}/api/products`, {
      next: { revalidate: 60 },
    });

    // Checks if response is OK (status 200-299)
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", errorText);
      throw new Error(`API request failed with status ${res.status}`);
    }

    // Parse as JSON
    products = await res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <>
        <section>
          <HeroSection />
          <FeaturedSection products={products} />
          <Footer/>
        </section>
    </>
  );
}
