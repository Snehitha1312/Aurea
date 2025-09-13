"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  colors: string[]
  category: string
  subcategory: string
  sizes: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
              onClick={(e) => {
                console.log("[v0] Wishlist button clicked for:", product.name)
                e.preventDefault()
                e.stopPropagation()
                alert(`Added ${product.name} to wishlist!`)
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            {product.discount > 0 && (
              <div
                className="absolute top-3 left-3 px-2 py-1 rounded text-sm font-bold shadow-lg"
                style={{
                  backgroundColor: "#D50032",
                  color: "#FFFFFF",
                  border: "1px solid #B8002E",
                }}
              >
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
    </Link>
  )
}
