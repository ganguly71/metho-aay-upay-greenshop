
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminCustomers from "@/components/admin/AdminCustomers";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "dashboard";

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-veggie-800 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">Manage your store data and monitor sales</p>
        
        <Tabs value={currentPath} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/admin/dashboard">Dashboard</Link>
            </TabsTrigger>
            <TabsTrigger value="products" asChild>
              <Link to="/admin/products">Products</Link>
            </TabsTrigger>
            <TabsTrigger value="customers" asChild>
              <Link to="/admin/customers">Customers</Link>
            </TabsTrigger>
            <TabsTrigger value="orders" asChild>
              <Link to="/admin/orders">Orders</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/orders" element={<AdminOrders />} />
      </Routes>
    </div>
  );
};

export default Admin;
