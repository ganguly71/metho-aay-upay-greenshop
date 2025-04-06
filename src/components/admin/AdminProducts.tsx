
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Edit, Trash2, Package, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { products, categories, Product } from '@/data/products';

const AdminProducts: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // In a real implementation, this would fetch from Supabase
  const { data: productData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // This would be a Supabase fetch call
      return products;
    },
  });
  
  const filteredProducts = productData?.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct({...product});
    setIsDialogOpen(true);
  };
  
  const handleAddNewProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      category: '',
      price: 0,
      unit: '',
      image: '',
      description: '',
      inStock: true
    });
    setIsDialogOpen(true);
  };
  
  const handleSaveProduct = () => {
    if (!editingProduct) return;
    
    // In a real implementation, this would save to Supabase
    toast({
      title: "Success",
      description: `Product "${editingProduct.name}" has been saved.`,
    });
    
    setIsDialogOpen(false);
    setEditingProduct(null);
  };
  
  const handleDeleteProduct = (product: Product) => {
    // In a real implementation, this would delete from Supabase
    toast({
      title: "Success",
      description: `Product "${product.name}" has been deleted.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-veggie-600" />
          <h2 className="text-2xl font-bold text-veggie-800">Products Management</h2>
        </div>
        
        <Button onClick={handleAddNewProduct} className="bg-veggie-600 hover:bg-veggie-700">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          {filteredProducts?.length || 0} products
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {categories.find(c => c.id === product.category)?.name || product.category}
                </TableCell>
                <TableCell className="text-right">
                  {product.discountPrice ? (
                    <>
                      <span className="font-bold">₹{product.discountPrice}</span>
                      <span className="text-gray-400 line-through ml-2">₹{product.price}</span>
                    </>
                  ) : (
                    <span>₹{product.price}</span>
                  )}
                </TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteProduct(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          
          {editingProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct({...editingProduct, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      value={editingProduct.discountPrice || ''}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        setEditingProduct({...editingProduct, discountPrice: value});
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({...editingProduct, unit: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={editingProduct.inStock}
                    onCheckedChange={(checked) => setEditingProduct({...editingProduct, inStock: !!checked})}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={editingProduct.featured || false}
                    onCheckedChange={(checked) => setEditingProduct({...editingProduct, featured: !!checked})}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  />
                  {editingProduct.image && (
                    <div className="mt-2 border rounded-md overflow-hidden">
                      <img 
                        src={editingProduct.image} 
                        alt={editingProduct.name}
                        className="w-full h-40 object-cover" 
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="w-full p-2 border rounded-md"
                    rows={5}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
