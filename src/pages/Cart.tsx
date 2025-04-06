
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import CartItem from "@/components/CartItem";
import { ShoppingCart, ArrowRight, CreditCard, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, itemCount, subtotal, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-veggie-800 mb-3">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
          </div>
          <Button asChild className="bg-veggie-500 hover:bg-veggie-600">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Calculate shipping based on cart total
  const shippingCost = subtotal >= 500 ? 0 : 40;
  const total = subtotal + shippingCost;
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-veggie-800 mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
              <h2 className="text-lg font-semibold text-veggie-800">
                Cart Items ({itemCount})
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button asChild variant="outline" className="w-full border-veggie-500 text-veggie-600 hover:bg-veggie-50">
                <Link to="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-veggie-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Shipping</span>
                {shippingCost === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="flex justify-between pt-3 text-base">
                <span className="font-bold text-veggie-800">Total</span>
                <span className="font-bold text-veggie-800">₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            {shippingCost > 0 && (
              <div className="my-4 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-md">
                Add ₹{(500 - subtotal).toFixed(2)} more to get free shipping!
              </div>
            )}
            
            <Button 
              asChild
              className="w-full mt-6 bg-veggie-500 hover:bg-veggie-600"
              size="lg"
            >
              <Link to="/checkout">
                <CreditCard className="h-4 w-4 mr-2" /> Proceed to Checkout
              </Link>
            </Button>
            
            <div className="mt-4 text-center text-xs text-gray-500">
              Estimated delivery time: 2-4 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
