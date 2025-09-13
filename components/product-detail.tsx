"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
  features: string[]
  category: string
  inStock: boolean
  stockCount: number
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { dispatch } = useCart()

  const handleAddToCart = () => {
    console.log("[v0] Add to cart clicked for:", product.name, "Size:", selectedSize, "Quantity:", quantity)
    if (!selectedSize && product.sizes.length > 1) {
      alert("Please select a size")
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize || product.sizes[0] || "One Size",
        quantity: quantity,
      },
    })
    alert("Added to cart!")
  }

  const handleBuyNow = () => {
    console.log("[v0] Buy now clicked for:", product.name)
    if (!selectedSize && product.sizes.length > 1) {
      alert("Please select a size")
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize || product.sizes[0] || "One Size",
        quantity: quantity,
      },
    })
    window.location.href = "/cart"
  }

  const nextImage = () => {
    console.log("[v0] Next image clicked, current:", selectedImage)
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    console.log("[v0] Previous image clicked, current:", selectedImage)
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Mobile Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white md:hidden"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white md:hidden"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full ${selectedImage === index ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Desktop Thumbnail Grid */}
          <div className="hidden md:grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-balance">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-bold">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {product.discount}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    console.log("[v0] Color selected:", color)
                    setSelectedColor(color)
                  }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-primary" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color === "multicolor" ? "#ff6b6b" : color }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          {product.sizes.length > 1 && (
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      console.log("[v0] Size selected:", size)
                      setSelectedSize(size)
                    }}
                    className={`px-3 py-2 text-sm border rounded-md ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  console.log("[v0] Quantity decrease clicked, current:", quantity)
                  setQuantity(Math.max(1, quantity - 1))
                }}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  console.log("[v0] Quantity increase clicked, current:", quantity)
                  setQuantity(Math.min(product.stockCount, quantity + 1))
                }}
                disabled={quantity >= product.stockCount}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">{product.stockCount} items left</span>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <Button onClick={handleAddToCart} className="flex-1" size="lg">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <Button onClick={handleBuyNow} variant="secondary" className="flex-1" size="lg">
              <span className="hidden sm:inline">Buy Now</span>
              <span className="sm:hidden">Buy</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                console.log("[v0] Wishlist toggle clicked, current state:", isWishlisted)
                setIsWishlisted(!isWishlisted)
              }}
              className="w-12"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 bg-transparent">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span className="text-sm">Easy Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 md:mt-12">
        {/* Mobile Collapsible Sections */}
        <div className="md:hidden space-y-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Product Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Product Details</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <p className="text-muted-foreground">{product.description}</p>
                <div>
                  <h3 className="font-medium mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Reviews & Ratings
                <ChevronRight className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Reviews & Ratings</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{Math.floor(Math.random() * 50 + 5)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <p className="text-muted-foreground mb-6">{product.description}</p>

            <h3 className="font-medium mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Reviews & Ratings</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold">{product.rating}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm w-3">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${Math.random() * 80 + 10}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{Math.floor(Math.random() * 50 + 5)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
