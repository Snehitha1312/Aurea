import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/placeholder-bbo0e.png" alt="Fashion Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Fashion That Defines You</h1>
          <p className="text-lg md:text-xl mb-8 text-pretty">
            Discover the latest trends in fashion with our curated collection of clothing, accessories, and lifestyle
            products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground bg-transparent"
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
