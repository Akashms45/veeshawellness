import Allproducts from "@/components/Allproducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products | Veesha Wellness",
  description: "Explore our range of high-quality pharmaceutical products across various categories.",
};

export default async function Page({ params }: { params: Promise<{ category?: string[] }> }) {
  // In Next.js 15+, params and searchParams are Promises.
  // Awaiting them is required to avoid potential runtime panics or warnings.
  await params;
  return <Allproducts />;
}
