"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (index: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: index })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <ShoppingBag className="h-16 md:h-24 w-16 md:w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-xl md:text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 text-sm md:text-base">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-4 md:py-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart} size="sm" className="text-xs md:text-sm bg-transparent">
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <Card key={`${item.id}-${item.color}-${item.size}`}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex gap-3 md:gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm md:text-base truncate">{item.name}</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">{item.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 md:gap-4 mb-3 text-xs md:text-sm">
                        <div className="flex items-center gap-1 md:gap-2">
                          <span>Color:</span>
                          <div
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full border"
                            style={{ backgroundColor: item.color === "multicolor" ? "#ff6b6b" : item.color }}
                          />
                        </div>
                        {item.size && (
                          <div className="flex items-center gap-1 md:gap-2">
                            <span>Size:</span>
                            <span className="font-medium">{item.size}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-6 w-6 md:h-8 md:w-8"
                          >
                            <Minus className="h-2 w-2 md:h-3 md:w-3" />
                          </Button>
                          <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 md:h-8 md:w-8"
                          >
                            <Plus className="h-2 w-2 md:h-3 md:w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-sm md:text-base">₹{item.price * item.quantity}</div>
                          {item.originalPrice > item.price && (
                            <div className="text-xs md:text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice * item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 md:top-24">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax</span>
                    <span>₹{Math.round(state.total * 0.18)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>₹{state.total + Math.round(state.total * 0.18)}</span>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs md:text-sm text-muted-foreground">Free shipping on orders over ₹999</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
