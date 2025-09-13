"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const allProducts = [
  // Men's Fashion
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
    category: "Men",
    subcategory: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Casual T-Shirt",
    brand: "ComfortWear",
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.0,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["white", "black", "red", "blue"],
    category: "Men",
    subcategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    category: "Men",
    subcategory: "Jeans",
    sizes: ["28", "30", "32", "34", "36", "38"],
  },
  {
    id: 4,
    name: "Formal Blazer",
    brand: "StyleCo",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.6,
    reviews: 92,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["black", "navy", "gray"],
    category: "Men",
    subcategory: "Formal Wear",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  // Women's Fashion
  {
    id: 5,
    name: "Floral Summer Dress",
    brand: "TrendWear",
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    rating: 4.5,
    reviews: 89,
    image: "/floral-summer-dress-women-fashion.jpg",
    colors: ["pink", "yellow", "green"],
    category: "Women",
    subcategory: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Elegant Silk Saree",
    brand: "EthnicElegance",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    rating: 4.8,
    reviews: 156,
    image: "/silk-saree-elegant.jpg",
    colors: ["red", "blue", "gold"],
    category: "Women",
    subcategory: "Sarees",
    sizes: ["One Size"],
  },
  {
    id: 7,
    name: "Casual Top",
    brand: "ChicStyle",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.3,
    reviews: 178,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["white", "black", "pink"],
    category: "Women",
    subcategory: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Designer Kurti",
    brand: "EthnicElegance",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.4,
    reviews: 134,
    image: "/kurti-ethnic-wear.jpg",
    colors: ["blue", "pink", "green"],
    category: "Women",
    subcategory: "Ethnic Wear",
    sizes: ["S", "M", "L", "XL"],
  },

  // Kids Collection
  {
    id: 9,
    name: "Kids Cartoon T-Shirt",
    brand: "FunWear",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.8,
    reviews: 145,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["blue", "pink", "yellow"],
    category: "Kids",
    subcategory: "Boys",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: 10,
    name: "Girls Party Dress",
    brand: "LittlePrincess",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.7,
    reviews: 98,
    image: "/girls-party-dress.jpg",
    colors: ["pink", "purple", "white"],
    category: "Kids",
    subcategory: "Girls",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },

  // Footwear
  {
    id: 11,
    name: "Sports Sneakers",
    brand: "ActiveWear",
    price: 2799,
    originalPrice: 3499,
    discount: 20,
    rating: 4.3,
    reviews: 178,
    image: "/white-sports-sneakers-athletic-shoes.jpg",
    colors: ["white", "black", "red"],
    category: "Footwear",
    subcategory: "Sneakers",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
  },
  {
    id: 12,
    name: "Elegant Heels",
    brand: "GlamourFeet",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.4,
    reviews: 76,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["black", "red", "nude"],
    category: "Footwear",
    subcategory: "Heels",
    sizes: ["5", "6", "7", "8", "9", "10"],
  },
  {
    id: 13,
    name: "Formal Leather Shoes",
    brand: "ClassicStep",
    price: 3299,
    originalPrice: 4499,
    discount: 27,
    rating: 4.5,
    reviews: 123,
    image: "/formal-leather-shoes.png",
    colors: ["black", "brown"],
    category: "Footwear",
    subcategory: "Formal Shoes",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
  },

  // Accessories
  {
    id: 14,
    name: "Leather Handbag",
    brand: "LuxeStyle",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder-47olq.png",
    colors: ["brown", "black", "tan"],
    category: "Accessories",
    subcategory: "Bags",
    sizes: ["One Size"],
  },
  {
    id: 15,
    name: "Silk Scarf",
    brand: "ElegantTouch",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.4,
    reviews: 45,
    image: "/placeholder-0swvi.png",
    colors: ["multicolor", "blue", "red"],
    category: "Accessories",
    subcategory: "Scarves",
    sizes: ["One Size"],
  },
  {
    id: 16,
    name: "Designer Watch",
    brand: "TimeStyle",
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    rating: 4.6,
    reviews: 234,
    image: "/designer-watch.jpg",
    colors: ["silver", "gold", "black"],
    category: "Accessories",
    subcategory: "Watches",
    sizes: ["One Size"],
  },

  // Beauty & Care
  {
    id: 17,
    name: "Skincare Set",
    brand: "GlowBeauty",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.5,
    reviews: 189,
    image: "/skincare-set.png",
    colors: ["white"],
    category: "Beauty",
    subcategory: "Skincare",
    sizes: ["One Size"],
  },
  {
    id: 18,
    name: "Makeup Kit",
    brand: "ColorPalette",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.3,
    reviews: 156,
    image: "/makeup-kit.png",
    colors: ["multicolor"],
    category: "Beauty",
    subcategory: "Makeup",
    sizes: ["One Size"],
  },

  // Home & Living
  {
    id: 19,
    name: "Decorative Cushions",
    brand: "HomeComfort",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.2,
    reviews: 87,
    image: "/decorative-cushions.png",
    colors: ["blue", "gray", "beige"],
    category: "Home",
    subcategory: "Decor",
    sizes: ["One Size"],
  },
  {
    id: 20,
    name: "Bedsheet Set",
    brand: "SleepWell",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 4.4,
    reviews: 145,
    image: "/bedsheet-set.jpg",
    colors: ["white", "blue", "pink"],
    category: "Home",
    subcategory: "Bedding",
    sizes: ["Single", "Double", "Queen", "King"],
  },

  // Sports & Fitness
  {
    id: 21,
    name: "Yoga Mat",
    brand: "FitLife",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.3,
    reviews: 234,
    image: "/rolled-yoga-mat.png",
    colors: ["purple", "blue", "green"],
    category: "Sports",
    subcategory: "Equipment",
    sizes: ["One Size"],
  },
  {
    id: 22,
    name: "Athletic Wear Set",
    brand: "SportsPro",
    price: 2299,
    originalPrice: 3199,
    discount: 28,
    rating: 4.5,
    reviews: 167,
    image: "/athletic-wear-set.jpg",
    colors: ["black", "gray", "blue"],
    category: "Sports",
    subcategory: "Activewear",
    sizes: ["S", "M", "L", "XL"],
  },
]

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRating, setSelectedRating] = useState<number>(0)

  const categories = [...new Set(allProducts.map((p) => p.category))]
  const brands = [...new Set(allProducts.map((p) => p.brand))]

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Rating filter
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, sortBy, selectedCategories, selectedBrands, priceRange, selectedRating])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 10000])
    setSelectedRating(0)
    setSearchQuery("")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="price-under-1000"
              checked={priceRange[1] <= 1000}
              onCheckedChange={(checked) => (checked ? setPriceRange([0, 1000]) : setPriceRange([0, 10000]))}
            />
            <label htmlFor="price-under-1000" className="text-sm">
              Under ₹1,000
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="price-1000-2500"
              checked={priceRange[0] >= 1000 && priceRange[1] <= 2500}
              onCheckedChange={(checked) => (checked ? setPriceRange([1000, 2500]) : setPriceRange([0, 10000]))}
            />
            <label htmlFor="price-1000-2500" className="text-sm">
              ₹1,000 - ₹2,500
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="price-2500-5000"
              checked={priceRange[0] >= 2500 && priceRange[1] <= 5000}
              onCheckedChange={(checked) => (checked ? setPriceRange([2500, 5000]) : setPriceRange([0, 10000]))}
            />
            <label htmlFor="price-2500-5000" className="text-sm">
              ₹2,500 - ₹5,000
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="price-above-5000"
              checked={priceRange[0] >= 5000}
              onCheckedChange={(checked) => (checked ? setPriceRange([5000, 10000]) : setPriceRange([0, 10000]))}
            />
            <label htmlFor="price-above-5000" className="text-sm">
              Above ₹5,000
            </label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="font-medium mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={(checked) => setSelectedRating(checked ? rating : 0)}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm">
                {rating}★ & above
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Search and Sort Header */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
