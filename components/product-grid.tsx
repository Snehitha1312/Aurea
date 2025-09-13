import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Classic Cotton Shirt",
    brand: "StyleCo",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.2,
    reviews: 156,
    image: "/placeholder-fjmic.png",
    colors: ["white", "blue", "black"],
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    brand: "TrendWear",
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    rating: 4.5,
    reviews: 89,
    image: "/floral-summer-dress-women-fashion.jpg",
    colors: ["pink", "yellow", "green"],
  },
  {
    id: 3,
    name: "Denim Casual Jeans",
    brand: "UrbanFit",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 4.1,
    reviews: 234,
    image: "/placeholder-bsrno.png",
    colors: ["blue", "black", "gray"],
  },
  {
    id: 4,
    name: "Leather Handbag",
    brand: "LuxeStyle",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder-47olq.png",
    colors: ["brown", "black", "tan"],
  },
  {
    id: 5,
    name: "Sports Sneakers",
    brand: "ActiveWear",
    price: 2799,
    originalPrice: 3499,
    discount: 20,
    rating: 4.3,
    reviews: 178,
    image: "/white-sports-sneakers-athletic-shoes.jpg",
    colors: ["white", "black", "red"],
  },
  {
    id: 6,
    name: "Silk Scarf",
    brand: "ElegantTouch",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.4,
    reviews: 45,
    image: "/placeholder-0swvi.png",
    colors: ["multicolor", "blue", "red"],
  },
]

export function ProductGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Now</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the most popular items loved by our customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-medium">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <h3 className="font-medium text-card-foreground line-clamp-1">{product.name}</h3>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-card-foreground">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color === "multicolor" ? "#ff6b6b" : color }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
