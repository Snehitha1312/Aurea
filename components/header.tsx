"use client"

import type React from "react"

import { useState } from "react"
import { Search, Heart, ShoppingBag, User, Menu, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const { state: cartState } = useCart()
  const { state: authState, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    console.log("[v0] Search form submitted with query:", searchQuery)
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/products")
    }
    setMobileSearchOpen(false)
  }

  const handleLogout = () => {
    console.log("[v0] Logout button clicked")
    logout()
    router.push("/")
  }

  const MobileNavContent = () => (
    <div className="flex flex-col h-full">
      {/* User Section */}
      <div className="p-4 border-b">
        {authState.isAuthenticated && authState.user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={authState.user.avatar || "/placeholder.svg"} alt={authState.user.name} />
              <AvatarFallback>{authState.user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{authState.user.name}</p>
              <p className="text-sm text-muted-foreground">{authState.user.email}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="w-full bg-transparent">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4 space-y-4">
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            <Link href="/products?category=Men" className="block py-2 text-sm">
              Men's Fashion
            </Link>
            <Link href="/products?category=Women" className="block py-2 text-sm">
              Women's Fashion
            </Link>
            <Link href="/products?category=Kids" className="block py-2 text-sm">
              Kids Collection
            </Link>
            <Link href="/products?category=Footwear" className="block py-2 text-sm">
              Footwear
            </Link>
            <Link href="/products?category=Beauty" className="block py-2 text-sm">
              Beauty & Care
            </Link>
            <Link href="/products?category=Accessories" className="block py-2 text-sm">
              Accessories
            </Link>
            <Link href="/products?category=Home" className="block py-2 text-sm">
              Home & Living
            </Link>
            <Link href="/products?category=Sports" className="block py-2 text-sm">
              Sports & Fitness
            </Link>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Quick Links</h3>
          <div className="space-y-2">
            <Link href="/products" className="block py-2 text-sm">
              All Products
            </Link>
            <Link href="/cart" className="flex items-center justify-between py-2 text-sm">
              <span>Shopping Cart</span>
              {cartState.itemCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Link>
            {authState.isAuthenticated && (
              <Link href="/profile" className="block py-2 text-sm">
                My Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      {authState.isAuthenticated && (
        <div className="p-4 border-t">
          <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-primary cursor-pointer">StyleHub</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  Men
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/products?category=Men&subcategory=Shirts">Shirts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Men&subcategory=T-Shirts">T-Shirts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Men&subcategory=Jeans">Jeans</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Men&subcategory=Formal Wear">Formal Wear</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  Women
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/products?category=Women&subcategory=Dresses">Dresses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Women&subcategory=Tops">Tops</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Women&subcategory=Sarees">Sarees</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Women&subcategory=Ethnic Wear">Ethnic Wear</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/products?category=Kids">
              <Button variant="ghost" className="font-medium">
                Kids
              </Button>
            </Link>
            <Link href="/products?category=Footwear">
              <Button variant="ghost" className="font-medium">
                Footwear
              </Button>
            </Link>
            <Link href="/products?category=Beauty">
              <Button variant="ghost" className="font-medium">
                Beauty
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/products?category=Accessories">Accessories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Home">Home & Living</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=Sports">Sports & Fitness</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10 bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => {
                console.log("[v0] Mobile search button clicked, current state:", mobileSearchOpen)
                setMobileSearchOpen(!mobileSearchOpen)
              }}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Desktop User Menu */}
            {authState.isAuthenticated && authState.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hidden md:flex">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={authState.user.avatar || "/placeholder.svg"} alt={authState.user.name} />
                      <AvatarFallback>{authState.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{authState.user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{authState.user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <MobileNavContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="lg:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  console.log("[v0] Mobile search close button clicked")
                  setMobileSearchOpen(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
