
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Helper functions for database operations

// Products
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data;
}

export async function updateProduct(product: any) {
  const { data, error } = await supabase
    .from('products')
    .upsert(product)
    .select();
  
  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  
  return data?.[0];
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
  
  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  
  return true;
}

// Customers
export async function fetchCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*');
  
  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
  
  return data;
}

// Orders
export async function fetchOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)');
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data;
}

// Dashboard data
export async function fetchSalesSummary() {
  const { data, error } = await supabase
    .from('sales_summary')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching sales summary:', error);
    return null;
  }
  
  return data;
}

export async function fetchDailySales() {
  const { data, error } = await supabase
    .from('daily_sales')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching daily sales:', error);
    return [];
  }
  
  return data;
}

export async function fetchTopProducts() {
  const { data, error } = await supabase
    .from('top_products')
    .select('*')
    .order('revenue', { ascending: false })
    .limit(5);
  
  if (error) {
    console.error('Error fetching top products:', error);
    return [];
  }
  
  return data;
}
