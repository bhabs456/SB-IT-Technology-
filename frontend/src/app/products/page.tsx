import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ProductsContent from "../../components/products-content";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const resolvedParams = await props.searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 🚀 Render the async Server Navbar completely outside the client context */}
      <Navbar />
      
      <Suspense fallback={<div className="text-center py-16 text-muted-foreground">Loading Products...</div>}>
        <ProductsContent initialParams={resolvedParams} />
      </Suspense>
      
      {/* 🚀 Render the async Server Footer completely outside the client context */}
      <Footer />
    </div>
  );
}