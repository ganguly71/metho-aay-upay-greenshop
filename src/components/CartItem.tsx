
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "./CartContext";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const itemPrice = (product.discountPrice || product.price) * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="h-16 w-16 rounded overflow-hidden mr-4 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div>
          <Link to={`/product/${product.id}`} className="font-medium text-veggie-800 hover:text-veggie-600">
            {product.name}
          </Link>
          <p className="text-sm text-gray-500">{product.unit}</p>
          <div className="mt-1 text-sm">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="font-medium text-veggie-700">₹{product.discountPrice}</span>
                <span className="ml-2 text-xs text-gray-500 line-through">₹{product.price}</span>
              </div>
            ) : (
              <span className="font-medium text-veggie-700">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        {/* Quantity Adjuster */}
        <div className="flex items-center border rounded w-full sm:w-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            className="h-8 w-8 rounded-none"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <div className="px-3 py-1 text-center min-w-[40px]">{quantity}</div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrease}
            className="h-8 w-8 rounded-none"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Item Total & Remove Button */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <div className="font-semibold text-veggie-800 mr-4 sm:text-right min-w-[80px]">
            ₹{itemPrice.toFixed(2)}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
