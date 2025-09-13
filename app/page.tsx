import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}
