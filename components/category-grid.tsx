import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  {
    title: "Men's Fashion",
    image: "/placeholder-4ylab.png",
    description: "Trendy styles for modern men",
    href: "/products?category=Men",
    subcategories: ["Shirts", "T-Shirts", "Jeans", "Formal Wear", "Casual Wear"],
  },
  {
    title: "Women's Fashion",
    image: "/placeholder-kjwpn.png",
    description: "Elegant and chic collections",
    href: "/products?category=Women",
    subcategories: ["Dresses", "Tops", "Sarees", "Western Wear", "Ethnic Wear"],
  },
  {
    title: "Kids Collection",
    image: "/kids-children-clothing-colorful-playful.jpg",
    description: "Comfortable and fun styles",
    href: "/products?category=Kids",
    subcategories: ["Boys", "Girls", "Infants", "School Wear", "Party Wear"],
  },
  {
    title: "Footwear",
    image: "/white-sports-sneakers-athletic-shoes.jpg",
    description: "Step out in style",
    href: "/products?category=Footwear",
    subcategories: ["Sneakers", "Formal Shoes", "Sandals", "Boots", "Sports Shoes"],
  },
  {
    title: "Accessories",
    image: "/fashion-accessories-bags-shoes-jewelry.jpg",
    description: "Complete your look",
    href: "/products?category=Accessories",
    subcategories: ["Bags", "Watches", "Jewelry", "Sunglasses", "Belts"],
  },
  {
    title: "Beauty & Care",
    image: "/beauty-cosmetics-skincare.png",
    description: "Glow with confidence",
    href: "/products?category=Beauty",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"],
  },
  {
    title: "Home & Living",
    image: "/placeholder-d6hr4.png",
    description: "Style your space",
    href: "/products?category=Home",
    subcategories: ["Decor", "Bedding", "Kitchen", "Furniture", "Lighting"],
  },
  {
    title: "Sports & Fitness",
    image: "/sports-fitness-equipment-gym.jpg",
    description: "Gear up for fitness",
    href: "/products?category=Sports",
    subcategories: ["Activewear", "Equipment", "Shoes", "Accessories", "Supplements"],
  },
]

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Explore our diverse range of fashion categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-32 md:h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-white">
                      <h3 className="text-sm md:text-lg lg:text-xl font-semibold mb-1">{category.title}</h3>
                      <p className="text-xs md:text-sm opacity-90 mb-1 md:mb-2 hidden md:block">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-1 hidden md:flex">
                        {category.subcategories.slice(0, 3).map((sub, idx) => (
                          <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded">
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs bg-white/20 px-2 py-1 rounded">
                            +{category.subcategories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
