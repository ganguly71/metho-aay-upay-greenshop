
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, TrendingUp, Leaf } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import { categories } from "@/data/products";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-veggie-50 to-veggie-100 py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-veggie-800 leading-tight">
                Fresh Vegetables <br />
                <span className="text-veggie-600">Delivered to Your Door</span>
              </h1>
              <p className="text-lg text-gray-700">
                Farm-fresh, organic vegetables sourced from local farmers. 
                Enjoy quality produce with convenient delivery options.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Button asChild size="lg" className="bg-veggie-600 hover:bg-veggie-700">
                  <Link to="/products">
                    <ShoppingCart className="h-5 w-5 mr-2" /> Shop Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-veggie-600 text-veggie-600 hover:bg-veggie-50">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Fresh vegetables" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-veggie-500 text-white p-2 rounded-full mr-3">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-veggie-800">100% Organic</p>
                    <p className="text-xs text-gray-500">Natural & Fresh</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-3 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-yellow-500 text-white p-2 rounded-full mr-3">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-veggie-800">4.9 Rating</p>
                    <p className="text-xs text-gray-500">Best Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-veggie-800 mb-3">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver the freshest vegetables from farm to your table with care and quality assurance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-veggie-50 p-6 rounded-lg text-center">
              <div className="bg-veggie-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-veggie-600" />
              </div>
              <h3 className="text-xl font-semibold text-veggie-800 mb-2">100% Organic</h3>
              <p className="text-gray-600">
                All our vegetables are organic and grown using sustainable farming methods.
              </p>
            </div>
            
            <div className="bg-veggie-50 p-6 rounded-lg text-center">
              <div className="bg-veggie-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-veggie-600" />
              </div>
              <h3 className="text-xl font-semibold text-veggie-800 mb-2">Fresh Quality</h3>
              <p className="text-gray-600">
                We guarantee freshness by delivering vegetables harvested within 24 hours.
              </p>
            </div>
            
            <div className="bg-veggie-50 p-6 rounded-lg text-center">
              <div className="bg-veggie-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-veggie-600" />
              </div>
              <h3 className="text-xl font-semibold text-veggie-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Doorstep delivery within hours of your order for maximum freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-veggie-800 mb-3">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of fresh vegetables by category
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center bg-veggie-50 group-hover:bg-veggie-100 transition-colors">
                    <h3 className="font-medium text-veggie-800">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-veggie-600 to-veggie-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enjoy Fresh Vegetables?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start shopping now and get fresh, organic vegetables delivered straight to your door.
          </p>
          <Button asChild size="lg" className="bg-white text-veggie-700 hover:bg-gray-100">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
