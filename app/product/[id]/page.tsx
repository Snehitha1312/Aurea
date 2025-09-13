import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"

// Sample product data - in a real app, this would come from a database
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
    images: [
      "/placeholder-fjmic.png",
      "/placeholder-msaeq.png",
      "/placeholder-uy0kj.png",
      "/placeholder-v8hpp.png",
    ],
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Premium quality cotton shirt perfect for both casual and formal occasions. Made with 100% pure cotton fabric for maximum comfort and breathability.",
    features: ["100% Pure Cotton", "Machine Washable", "Wrinkle Resistant", "Comfortable Fit", "Durable Fabric"],
    category: "Men's Fashion",
    inStock: true,
    stockCount: 25,
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
    images: [
      "/floral-summer-dress-women-fashion.jpg",
      "/floral-dress-front.png",
      "/placeholder-ioocb.png",
      "/floral-dress-detail.jpg",
    ],
    colors: ["pink", "yellow", "green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Beautiful floral summer dress perfect for warm weather. Features a flowing silhouette and vibrant floral prints.",
    features: ["Lightweight Fabric", "Floral Print", "Flowing Silhouette", "Comfortable Fit", "Easy Care"],
    category: "Women's Fashion",
    inStock: true,
    stockCount: 15,
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
    images: [
      "/placeholder-bsrno.png",
      "/placeholder-i5hjn.png",
      "/placeholder-w37yj.png",
      "/placeholder-rq50e.png",
    ],
    colors: ["blue", "black", "gray"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description:
      "Classic denim jeans with a modern fit. Perfect for everyday casual wear with superior comfort and style.",
    features: ["Premium Denim", "Comfortable Fit", "Durable Construction", "Classic Design", "Versatile Style"],
    category: "Men's Fashion",
    inStock: true,
    stockCount: 30,
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
    images: [
      "/placeholder-47olq.png",
      "/placeholder-509al.png",
      "/placeholder-ioi55.png",
      "/placeholder-fehc4.png",
    ],
    colors: ["brown", "black", "tan"],
    sizes: ["One Size"],
    description:
      "Elegant leather handbag crafted from premium genuine leather. Features multiple compartments and a timeless design.",
    features: ["Genuine Leather", "Multiple Compartments", "Adjustable Strap", "Premium Hardware", "Timeless Design"],
    category: "Accessories",
    inStock: true,
    stockCount: 8,
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
    images: [
      "/white-sports-sneakers-athletic-shoes.jpg",
      "/placeholder-alzos.png",
      "/placeholder-u896k.png",
      "/placeholder-mxs9p.png",
    ],
    colors: ["white", "black", "red"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    description:
      "High-performance sports sneakers designed for comfort and style. Perfect for workouts, running, or casual wear.",
    features: ["Breathable Mesh", "Cushioned Sole", "Lightweight Design", "Non-slip Grip", "Durable Construction"],
    category: "Footwear",
    inStock: true,
    stockCount: 20,
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
    images: [
      "/placeholder-0swvi.png",
      "/silk-scarf-pattern.png",
      "/placeholder-jm63v.png",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: ["multicolor", "blue", "red"],
    sizes: ["One Size"],
    description:
      "Luxurious silk scarf with beautiful patterns. Perfect accessory to elevate any outfit with elegance and style.",
    features: ["100% Pure Silk", "Hand-finished Edges", "Vibrant Colors", "Versatile Styling", "Premium Quality"],
    category: "Accessories",
    inStock: true,
    stockCount: 12,
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}
