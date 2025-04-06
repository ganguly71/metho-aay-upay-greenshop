
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "../data/products";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="section-padding bg-veggie-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-veggie-800">Featured Products</h2>
          <Button asChild variant="ghost" className="text-veggie-600 hover:text-veggie-700">
            <Link to="/products" className="flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="mb-8 overflow-hidden rounded-lg shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1800&auto=format&fit=crop" 
            alt="Fresh Vegetables Selection" 
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
