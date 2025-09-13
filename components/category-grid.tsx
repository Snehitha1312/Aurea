import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    title: "Men's Fashion",
    image: "/placeholder-4ylab.png",
    description: "Trendy styles for modern men",
  },
  {
    title: "Women's Fashion",
    image: "/placeholder-kjwpn.png",
    description: "Elegant and chic collections",
  },
  {
    title: "Kids Collection",
    image: "/kids-children-clothing-colorful-playful.jpg",
    description: "Comfortable and fun styles",
  },
  {
    title: "Accessories",
    image: "/fashion-accessories-bags-shoes-jewelry.jpg",
    description: "Complete your look",
  },
  {
    title: "Beauty & Care",
    image: "/beauty-cosmetics-skincare.png",
    description: "Glow with confidence",
  },
  {
    title: "Home & Living",
    image: "/placeholder-d6hr4.png",
    description: "Style your space",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse range of fashion categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
