
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Eye, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus } from '@/types/admin';

// Mock data (replace with actual data from Supabase later)
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "cust-001",
    customerName: "Raj Sharma",
    orderDate: "2024-04-01",
    status: "delivered",
    items: [
      { id: "item1", productId: "spinach-fresh", productName: "Fresh Spinach", quantity: 2, unitPrice: 35, subtotal: 70 },
      { id: "item2", productId: "carrot-organic", productName: "Organic Carrots", quantity: 1, unitPrice: 40, subtotal: 40 }
    ],
    subtotal: 110,
    tax: 5.5,
    shipping: 30,
    total: 145.5,
    paymentMethod: "Cash on Delivery",
    shippingAddress: "42 Green Park, New Delhi, Delhi 110001"
  },
  {
    id: "ORD-002",
    customerId: "cust-002",
    customerName: "Priya Patel",
    orderDate: "2024-04-02",
    status: "shipped",
    items: [
      { id: "item3", productId: "broccoli", productName: "Broccoli Crown", quantity: 1, unitPrice: 70, subtotal: 70 },
      { id: "item4", productId: "bell-pepper-mix", productName: "Mixed Bell Peppers", quantity: 2, unitPrice: 80, subtotal: 160 }
    ],
    subtotal: 230,
    tax: 11.5,
    shipping: 30,
    total: 271.5,
    paymentMethod: "UPI",
    shippingAddress: "78 Lake Gardens, Mumbai, Maharashtra 400001"
  },
  {
    id: "ORD-003",
    customerId: "cust-003",
    customerName: "Vikram Singh",
    orderDate: "2024-04-03",
    status: "processing",
    items: [
      { id: "item5", productId: "cucumber-english", productName: "English Cucumber", quantity: 3, unitPrice: 30, subtotal: 90 },
      { id: "item6", productId: "tomato-vine", productName: "Vine Tomatoes", quantity: 1, unitPrice: 50, subtotal: 50 }
    ],
    subtotal: 140,
    tax: 7,
    shipping: 30,
    total: 177,
    paymentMethod: "Credit Card",
    shippingAddress: "15 Model Town, Chandigarh, Punjab 160001"
  },
  {
    id: "ORD-004",
    customerId: "cust-004",
    customerName: "Ananya Desai",
    orderDate: "2024-04-04",
    status: "pending",
    items: [
      { id: "item7", productId: "methi-fresh", productName: "Fresh Methi", quantity: 2, unitPrice: 20, subtotal: 40 },
      { id: "item8", productId: "onion-red", productName: "Red Onions", quantity: 1, unitPrice: 30, subtotal: 30 }
    ],
    subtotal: 70,
    tax: 3.5,
    shipping: 30,
    total: 103.5,
    paymentMethod: "UPI",
    shippingAddress: "23 Whitefield, Bangalore, Karnataka 560001"
  },
  {
    id: "ORD-005",
    customerId: "cust-005",
    customerName: "Arjun Kapoor",
    orderDate: "2024-04-05",
    status: "cancelled",
    items: [
      { id: "item9", productId: "cabbage-green", productName: "Green Cabbage", quantity: 1, unitPrice: 35, subtotal: 35 }
    ],
    subtotal: 35,
    tax: 1.75,
    shipping: 30,
    total: 66.75,
    paymentMethod: "Cash on Delivery",
    shippingAddress: "56 Salt Lake, Kolkata, West Bengal 700001"
  }
];

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // In a real implementation, this would fetch from Supabase
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      // This would be a Supabase fetch call
      return mockOrders;
    },
  });
  
  const filteredOrders = orders?.filter(order => {
    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsDialogOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    // In a real implementation, this would update Supabase
    if (selectedOrder) {
      // Update the selected order
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ShoppingBag className="h-5 w-5 text-veggie-600" />
        <h2 className="text-2xl font-bold text-veggie-800">Order Management</h2>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div className="w-64">
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-40">
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {filteredOrders?.length || 0} orders
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{formatDate(order.orderDate)}</TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Customer Details</h3>
                  <p className="text-sm">{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-500">ID: {selectedOrder.customerId}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Order Information</h3>
                  <p className="text-sm">Date: {formatDate(selectedOrder.orderDate)}</p>
                  <p className="text-sm">Payment: {selectedOrder.paymentMethod}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Status</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedOrder.status)}
                    
                    <Select 
                      defaultValue={selectedOrder.status} 
                      onValueChange={(value: OrderStatus) => handleUpdateStatus(selectedOrder.id, value)}
                    >
                      <SelectTrigger className="w-[150px] h-8 text-xs">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
                <p className="text-sm">{selectedOrder.shippingAddress}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-right">₹{item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">₹{item.subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Tax:</span>
                  <span>₹{selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Shipping:</span>
                  <span>₹{selectedOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-bold mt-2 pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
