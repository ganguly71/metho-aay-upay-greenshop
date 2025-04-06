
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-veggie-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">METHO AAY-UPAY</h2>
            <p className="text-gray-300 text-sm">
              Your trusted source for fresh, high-quality vegetables delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=leafy-greens" className="text-gray-300 hover:text-white text-sm">
                  Leafy Greens
                </Link>
              </li>
              <li>
                <Link to="/products?category=root-vegetables" className="text-gray-300 hover:text-white text-sm">
                  Root Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=fruit-vegetables" className="text-gray-300 hover:text-white text-sm">
                  Fruit Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=exotic" className="text-gray-300 hover:text-white text-sm">
                  Exotic Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=organic" className="text-gray-300 hover:text-white text-sm">
                  Organic Certified
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-veggie-400 mr-2 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Fresh Market Street, Vegetable District, 560001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-veggie-400 mr-2" />
                <span className="text-gray-300 text-sm">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-veggie-400 mr-2" />
                <span className="text-gray-300 text-sm">info@methoaayupay.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} METHO AAY-UPAY. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
