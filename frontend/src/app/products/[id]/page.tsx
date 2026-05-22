import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ProductDetailContent from "../../../components/product-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Resolve dynamic URL route parameter parameters natively on Next.js server engine
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 🚀 Async Server components render cleanly at the server layer layout root */}
      <Navbar />
      
      <main className="flex-1">
        <ProductDetailContent productId={productId} />
      </main>
      
      <Footer />
    </div>
  );
}