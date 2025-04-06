
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-veggie-100 shadow-sm">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-veggie-700">
              METHO <span className="text-veggie-500">AAY-UPAY</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-veggie-800 hover:text-veggie-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-veggie-800 hover:text-veggie-600 font-medium">
              Products
            </Link>
            <Link to="/about" className="text-veggie-800 hover:text-veggie-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-veggie-800 hover:text-veggie-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search Form (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Search vegetables..."
                className="w-48 lg:w-64 pl-9 py-2 border-veggie-200 focus-visible:ring-veggie-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-veggie-500" />
            </form>

            {/* Cart Link */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-veggie-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-veggie-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-veggie-700" />
              ) : (
                <Menu className="h-6 w-6 text-veggie-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search (always visible on mobile) */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <Input
              type="search"
              placeholder="Search vegetables..."
              className="w-full pl-9 py-2 border-veggie-200 focus-visible:ring-veggie-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-veggie-500" />
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 py-4 border-t border-veggie-100 animate-fade-in">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-veggie-800 hover:bg-veggie-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-veggie-800 hover:bg-veggie-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-veggie-800 hover:bg-veggie-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-veggie-800 hover:bg-veggie-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
