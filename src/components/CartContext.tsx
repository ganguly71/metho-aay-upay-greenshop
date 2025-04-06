
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../data/products";
import { toast } from "@/components/ui/use-toast";

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }

    // Update item count and subtotal
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);

    const total = items.reduce((sum, item) => {
      const price = item.product.discountPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
    setSubtotal(total);
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated to ${existingItem.quantity + quantity}`,
        });
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const product = prevItems.find(item => item.product.id === productId)?.product;
      if (product) {
        toast({
          title: "Removed from cart",
          description: `${product.name} removed from your cart`,
        });
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
