
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Eye, Users } from 'lucide-react';
import { Customer } from '@/types/admin';

// Mock data (replace with actual data from Supabase later)
const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Raj Sharma",
    email: "raj.sharma@example.com",
    phone: "+91 9876543210",
    address: "42 Green Park",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    createdAt: "2024-01-15",
    orderCount: 5,
    totalSpent: 2450,
  },
  {
    id: "cust-002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 8765432109",
    address: "78 Lake Gardens",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    createdAt: "2024-02-03",
    orderCount: 3,
    totalSpent: 1280,
  },
  {
    id: "cust-003",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 7654321098",
    address: "15 Model Town",
    city: "Chandigarh",
    state: "Punjab",
    zipCode: "160001",
    createdAt: "2024-02-20",
    orderCount: 2,
    totalSpent: 980,
  },
  {
    id: "cust-004",
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    phone: "+91 6543210987",
    address: "23 Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    createdAt: "2024-03-10",
    orderCount: 4,
    totalSpent: 2120,
  },
  {
    id: "cust-005",
    name: "Arjun Kapoor",
    email: "arjun.kapoor@example.com",
    phone: "+91 5432109876",
    address: "56 Salt Lake",
    city: "Kolkata",
    state: "West Bengal",
    zipCode: "700001",
    createdAt: "2024-03-25",
    orderCount: 1,
    totalSpent: 420,
  },
];

const AdminCustomers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // In a real implementation, this would fetch from Supabase
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      // This would be a Supabase fetch call
      return mockCustomers;
    },
  });
  
  const filteredCustomers = customers?.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailsDialogOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-veggie-600" />
        <h2 className="text-2xl font-bold text-veggie-800">Customer Management</h2>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          {filteredCustomers?.length || 0} customers
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="text-right">Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.city}, {customer.state}</TableCell>
                <TableCell className="text-right">{customer.orderCount}</TableCell>
                <TableCell className="text-right">₹{customer.totalSpent.toLocaleString()}</TableCell>
                <TableCell className="text-right">{formatDate(customer.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(customer)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-500">Customer ID</Label>
                  <p>{selectedCustomer.id}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Name</Label>
                  <p>{selectedCustomer.name}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Email</Label>
                  <p>{selectedCustomer.email}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Phone</Label>
                  <p>{selectedCustomer.phone || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Total Orders</Label>
                  <p>{selectedCustomer.orderCount}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Total Spent</Label>
                  <p>₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-500">Address</Label>
                  <p>{selectedCustomer.address || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">City</Label>
                  <p>{selectedCustomer.city || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">State</Label>
                  <p>{selectedCustomer.state || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Zip Code</Label>
                  <p>{selectedCustomer.zipCode || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-gray-500">Customer Since</Label>
                  <p>{formatDate(selectedCustomer.createdAt)}</p>
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

export default AdminCustomers;
