
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpCircle, ShoppingBag, Users, TrendingUp, Package } from "lucide-react";

// Mock data (replace with actual data from Supabase later)
const mockSalesData = {
  totalSales: 24680,
  orderCount: 142,
  averageOrderValue: 173.80,
  topProducts: [
    { productId: "spinach-fresh", productName: "Fresh Spinach", quantity: 89, revenue: 3115 },
    { productId: "carrot-organic", productName: "Organic Carrots", quantity: 76, revenue: 3040 },
    { productId: "broccoli", productName: "Broccoli Crown", quantity: 68, revenue: 4760 },
    { productId: "methi-fresh", productName: "Fresh Methi", quantity: 54, revenue: 1080 },
  ],
  dailySales: [
    { date: "Apr 1", sales: 1200, orders: 18 },
    { date: "Apr 2", sales: 1800, orders: 24 },
    { date: "Apr 3", sales: 1400, orders: 16 },
    { date: "Apr 4", sales: 2200, orders: 28 },
    { date: "Apr 5", sales: 1600, orders: 22 },
    { date: "Apr 6", sales: 2400, orders: 34 },
  ],
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockSalesData.totalSales.toLocaleString()}</div>
            <p className="text-xs text-gray-500">+16% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSalesData.orderCount}</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockSalesData.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-gray-500">+2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Sales</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4ade80" name="Sales (₹)" />
                <Line type="monotone" dataKey="orders" stroke="#6366f1" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSalesData.topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#4ade80" name="Revenue (₹)" />
                <Bar dataKey="quantity" fill="#6366f1" name="Quantity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
