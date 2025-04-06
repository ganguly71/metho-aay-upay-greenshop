
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useCart } from "@/components/CartContext";
import { ShoppingCart, ChevronLeft, Plus, Minus, Leaf, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = productId ? getProductById(productId) : undefined;
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-veggie-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")} className="bg-veggie-500 hover:bg-veggie-600">
          <ChevronLeft className="h-4 w-4 mr-2" /> Browse Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const relatedProducts = getProductById(productId || "") 
    ? product?.category 
      ? getProductById(productId)?.category
        ? getProductById(productId)?.id 
          ? [] 
          : [] 
        : [] 
      : [] 
    : [];
  
  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="text-veggie-600 hover:text-veggie-800 -ml-3"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>
      
      {/* Product Detail */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden border border-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-veggie-800 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.unit}</p>
            
            {/* Price */}
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-veggie-700">₹{product.discountPrice}</span>
                  <span className="ml-3 text-lg text-gray-500 line-through">₹{product.price}</span>
                  <span className="ml-3 bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                    Save ₹{product.price - product.discountPrice}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-veggie-700">₹{product.price}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Stock Status */}
            {product.inStock ? (
              <div className="flex items-center text-green-600 mb-6">
                <Leaf className="h-5 w-5 mr-2" />
                <span>In Stock</span>
              </div>
            ) : (
              <div className="text-red-600 mb-6">Out of Stock</div>
            )}
            
            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="mr-4 text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="rounded-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-center w-12">{quantity}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={increaseQuantity}
                      className="rounded-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="bg-veggie-500 hover:bg-veggie-600 text-white flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-veggie-500 text-veggie-600 hover:bg-veggie-50" 
                    size="lg"
                    onClick={() => {
                      handleAddToCart();
                      navigate("/cart");
                    }}
                  >
                    Buy Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Nutrition Facts */}
            {product.nutritionFacts && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-veggie-800 mb-3">Nutrition Facts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-gray-700 text-sm">Calories</p>
                    <p className="text-veggie-700 font-bold">{product.nutritionFacts.calories} kcal</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-gray-700 text-sm">Protein</p>
                    <p className="text-veggie-700 font-bold">{product.nutritionFacts.protein}g</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-gray-700 text-sm">Carbs</p>
                    <p className="text-veggie-700 font-bold">{product.nutritionFacts.carbs}g</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-gray-700 text-sm">Fiber</p>
                    <p className="text-veggie-700 font-bold">{product.nutritionFacts.fiber}g</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
