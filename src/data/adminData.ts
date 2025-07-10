import { Order, Product, Category } from '../types';

// Mock admin data
export const mockAdminStats = {
  totalProducts: 124,
  totalOrders: 89,
  totalCustomers: 1234,
  totalRevenue: 12345,
  monthlyGrowth: {
    products: 12,
    orders: 8,
    customers: 15,
    revenue: 23,
  },
};

export const mockSalesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

export const mockCategoryData = [
  { name: 'Men', value: 45, color: 'bg-blue-600' },
  { name: 'Women', value: 35, color: 'bg-pink-600' },
  { name: 'Children', value: 20, color: 'bg-green-600' },
];

export const mockTopProducts = [
  { name: 'Loose Fit Hoodie', value: 89, color: 'bg-blue-600' },
  { name: 'Striped Jacket', value: 67, color: 'bg-green-600' },
  { name: 'Gradient T-shirt', value: 54, color: 'bg-yellow-600' },
  { name: 'Polo Shirt', value: 43, color: 'bg-purple-600' },
  { name: 'Denim Jacket', value: 32, color: 'bg-red-600' },
];

export const mockRecentOrders: Order[] = [
  {
    id: '001',
    userId: '1',
    items: [
      {
        id: '1',
        productId: '1',
        name: 'Loose Fit Hoodie',
        nameAr: 'هودي فضفاض',
        price: 24.99,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
        size: 'M',
        color: 'black',
        quantity: 2,
      },
    ],
    total: 49.98,
    status: 'processing',
    shippingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1234567890',
      isDefault: true,
    },
    paymentMethod: 'card',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '002',
    userId: '2',
    items: [
      {
        id: '2',
        productId: '2',
        name: 'Striped Jacket',
        nameAr: 'جاكيت مخطط',
        price: 89.99,
        image: 'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=800',
        size: 'L',
        color: 'blue',
        quantity: 1,
      },
    ],
    total: 89.99,
    status: 'shipped',
    shippingAddress: {
      id: '2',
      type: 'home',
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '+1987654321',
      isDefault: true,
    },
    paymentMethod: 'paypal',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
];

export const mockTrafficData = [
  { name: 'Mon', value: 1200 },
  { name: 'Tue', value: 1900 },
  { name: 'Wed', value: 1500 },
  { name: 'Thu', value: 2200 },
  { name: 'Fri', value: 2800 },
  { name: 'Sat', value: 3200 },
  { name: 'Sun', value: 2100 },
];

export const mockUserActivityData = [
  { name: 'New Users', value: 234, color: '#3B82F6' },
  { name: 'Returning Users', value: 567, color: '#10B981' },
  { name: 'Guest Users', value: 123, color: '#F59E0B' },
];