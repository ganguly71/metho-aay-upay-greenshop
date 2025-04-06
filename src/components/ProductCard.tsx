
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "./CartContext";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden card-shadow ${
        featured ? "border-2 border-veggie-300" : "border border-gray-100"
      }`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-veggie-500 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
          {product.discountPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-veggie-800 mb-1">{product.name}</h3>
          <p className="text-veggie-600 text-sm mb-2">{product.unit}</p>
          
          <div className="flex items-center mb-3">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-veggie-700">₹{product.discountPrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-veggie-700">₹{product.price}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-veggie-500 hover:bg-veggie-600 text-white"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Add
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-veggie-500 text-veggie-600 hover:bg-veggie-50"
              asChild
            >
              <Link to={`/product/${product.id}`}>
                <Info className="h-4 w-4 mr-1" /> Details
              </Link>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
