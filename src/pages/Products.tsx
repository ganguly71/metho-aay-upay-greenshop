
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { 
  products, 
  categories, 
  getProductsByCategory, 
  searchProducts 
} from "@/data/products";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Parse URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    const searchParam = queryParams.get("search");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = getProductsByCategory(selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply in-stock filter
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Apply price range filter (assuming price is in the same currency)
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortOption, inStockOnly, priceRange]);
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setSortOption("featured");
    setInStockOnly(false);
    setPriceRange([0, 100]);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-veggie-800 mb-2">All Products</h1>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="mr-3 border-veggie-300 text-veggie-700 hover:bg-veggie-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] border-veggie-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Filters and Products Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Mobile */}
        {showFilters && (
          <div className="lg:hidden w-full bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-veggie-800">
                <SlidersHorizontal className="h-5 w-5 inline mr-2" /> Filters
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-veggie-600"
              >
                <X className="h-4 w-4 mr-1" /> Clear all
              </Button>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-veggie-800 mb-3">Categories</h3>
              <RadioGroup value={selectedCategory || ""} onValueChange={setSelectedCategory}>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <RadioGroupItem value="" id="all-mobile" className="text-veggie-500" />
                    <Label htmlFor="all-mobile" className="ml-2 cursor-pointer">All Products</Label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <RadioGroupItem value={category.id} id={`${category.id}-mobile`} className="text-veggie-500" />
                      <Label htmlFor={`${category.id}-mobile`} className="ml-2 cursor-pointer">{category.name}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            {/* Availability Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-veggie-800 mb-3">Availability</h3>
              <div className="flex items-center">
                <Checkbox 
                  id="in-stock-mobile" 
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                  className="text-veggie-500 border-gray-300" 
                />
                <Label htmlFor="in-stock-mobile" className="ml-2 cursor-pointer">In Stock Only</Label>
              </div>
            </div>
          </div>
        )}
        
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white p-5 rounded-lg border border-gray-200 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-veggie-800">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-veggie-600 h-7 px-2"
              >
                Clear all
              </Button>
            </div>
            
            {/* Categories Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-veggie-800 mb-3">Categories</h3>
              <RadioGroup value={selectedCategory || ""} onValueChange={setSelectedCategory}>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <RadioGroupItem value="" id="all" className="text-veggie-500" />
                    <Label htmlFor="all" className="ml-2 cursor-pointer">All Products</Label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <RadioGroupItem value={category.id} id={category.id} className="text-veggie-500" />
                      <Label htmlFor={category.id} className="ml-2 cursor-pointer">{category.name}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            {/* Availability Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-veggie-800 mb-3">Availability</h3>
              <div className="flex items-center">
                <Checkbox 
                  id="in-stock" 
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                  className="text-veggie-500 border-gray-300" 
                />
                <Label htmlFor="in-stock" className="ml-2 cursor-pointer">In Stock Only</Label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} className="bg-veggie-500 hover:bg-veggie-600">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
