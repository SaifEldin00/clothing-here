@@ .. @@
 import React, { useState } from 'react';
 import { Routes, Route, Link, useLocation } from 'react-router-dom';
 import { 
   Package, 
   ShoppingCart, 
   Users, 
   BarChart3, 
   Settings,
-  Plus,
-  Edit,
-  Trash2
+  Plus,
+  Edit,
+  Trash2,
+  TrendingUp,
+  DollarSign,
+  Eye,
+  UserCheck,
+  Grid,
+  Tag
 } from 'lucide-react';
-import { mockProducts } from '../data/mockData';
+import { mockProducts, mockCategories } from '../data/mockData';
+import { mockAdminStats, mockSalesData, mockCategoryData, mockTopProducts, mockRecentOrders, mockTrafficData, mockUserActivityData } from '../data/adminData';
+import StatsCard from '../components/Admin/Dashboard/StatsCard';
+import Chart from '../components/Admin/Dashboard/Chart';
+import ProductForm from '../components/Admin/Products/ProductForm';
+import CategoryForm from '../components/Admin/Categories/CategoryForm';
+import OrderDetails from '../components/Admin/Orders/OrderDetails';
+import { Product, Category, Order } from '../types';

 // Admin Components
 const Dashboard: React.FC = () => {
-  const stats = [
-    { name: 'Total Products', value: '124', icon: Package, color: 'text-blue-600' },
-    { name: 'Orders', value: '89', icon: ShoppingCart, color: 'text-green-600' },
-    { name: 'Customers', value: '1,234', icon: Users, color: 'text-purple-600' },
-    { name: 'Revenue', value: '$12,345', icon: BarChart3, color: 'text-yellow-600' },
-  ];
-
   return (
-    <div className="space-y-6">
-      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
+    <div className="space-y-8">
+      <div className="flex items-center justify-between">
+        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
+        <div className="text-sm text-gray-500">
+          Last updated: {new Date().toLocaleDateString()}
+        </div>
+      </div>
       
-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
-        {stats.map((stat) => (
-          <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
-            <div className="flex items-center">
-              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
-                <stat.icon className="h-6 w-6" />
-              </div>
-              <div className="ml-4">
-                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
-                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
-              </div>
-            </div>
-          </div>
-        ))}
+      {/* Stats Cards */}
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+        <StatsCard
+          title="Total Products"
+          value={mockAdminStats.totalProducts}
+          change={mockAdminStats.monthlyGrowth.products}
+          icon={Package}
+          color="bg-blue-600"
+        />
+        <StatsCard
+          title="Total Orders"
+          value={mockAdminStats.totalOrders}
+          change={mockAdminStats.monthlyGrowth.orders}
+          icon={ShoppingCart}
+          color="bg-green-600"
+        />
+        <StatsCard
+          title="Total Customers"
+          value={mockAdminStats.totalCustomers.toLocaleString()}
+          change={mockAdminStats.monthlyGrowth.customers}
+          icon={Users}
+          color="bg-purple-600"
+        />
+        <StatsCard
+          title="Total Revenue"
+          value={`$${mockAdminStats.totalRevenue.toLocaleString()}`}
+          change={mockAdminStats.monthlyGrowth.revenue}
+          icon={DollarSign}
+          color="bg-yellow-600"
+        />
       </div>

-      <div className="bg-white p-6 rounded-lg shadow">
-        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
-        <div className="space-y-4">
-          {[1, 2, 3, 4, 5].map((order) => (
-            <div key={order} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
-              <div>
-                <p className="font-medium text-gray-900">Order #000{order}</p>
-                <p className="text-sm text-gray-500">Customer Name</p>
-              </div>
-              <div className="text-right">
-                <p className="font-medium text-gray-900">$99.99</p>
-                <p className="text-sm text-green-600">Completed</p>
-              </div>
-            </div>
-          ))}
+      {/* Charts Row */}
+      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
+        <Chart
+          title="Monthly Sales"
+          data={mockSalesData}
+          type="line"
+        />
+        <Chart
+          title="Sales by Category"
+          data={mockCategoryData}
+          type="pie"
+        />
+      </div>

+      {/* Additional Charts */}
+      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
+        <Chart
+          title="Top Selling Products"
+          data={mockTopProducts}
+          type="bar"
+        />
+        <Chart
+          title="Weekly Traffic"
+          data={mockTrafficData}
+          type="line"
+        />
+      </div>
+
+      {/* Recent Activity */}
+      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
+          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
+          <div className="space-y-4">
+            {mockRecentOrders.slice(0, 5).map((order) => (
+              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
+                <div>
+                  <p className="font-medium text-gray-900">Order #{order.id}</p>
+                  <p className="text-sm text-gray-500">
+                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
+                  </p>
+                </div>
+                <div className="text-right">
+                  <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
+                  <p className={`text-sm capitalize ${
+                    order.status === 'delivered' ? 'text-green-600' :
+                    order.status === 'shipped' ? 'text-blue-600' :
+                    order.status === 'processing' ? 'text-yellow-600' :
+                    'text-gray-600'
+                  }`}>
+                    {order.status}
+                  </p>
+                </div>
+              </div>
+            ))}
+          </div>
+        </div>
+
+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
+          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
+          <div className="space-y-4">
+            {mockUserActivityData.map((item, index) => (
+              <div key={index} className="flex items-center justify-between">
+                <div className="flex items-center">
+                  <div
+                    className="w-3 h-3 rounded-full mr-3"
+                    style={{ backgroundColor: item.color }}
+                  />
+                  <span className="text-sm text-gray-700">{item.name}</span>
+                </div>
+                <span className="text-sm font-medium text-gray-900">{item.value}</span>
+              </div>
+            ))}
+          </div>
         </div>
       </div>
     </div>
@@ .. @@

 const Products: React.FC = () => {
   const [products] = useState(mockProducts);
+  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
+  const [isFormOpen, setIsFormOpen] = useState(false);
+
+  const handleAddProduct = () => {
+    setSelectedProduct(undefined);
+    setIsFormOpen(true);
+  };
+
+  const handleEditProduct = (product: Product) => {
+    setSelectedProduct(product);
+    setIsFormOpen(true);
+  };
+
+  const handleSaveProduct = (productData: Partial<Product>) => {
+    // In a real app, this would make an API call
+    console.log('Saving product:', productData);
+  };

   return (
     <div className="space-y-6">
       <div className="flex justify-between items-center">
-        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
-        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
+        <div>
+          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
+          <p className="text-gray-600">Manage your product catalog</p>
+        </div>
+        <button 
+          onClick={handleAddProduct}
+          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
+        >
           <Plus className="h-5 w-5" />
           <span>Add Product</span>
         </button>
@@ .. @@
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                   <div className="flex space-x-2">
-                    <button className="text-blue-600 hover:text-blue-700">
+                    <button 
+                      onClick={() => handleEditProduct(product)}
+                      className="text-blue-600 hover:text-blue-700"
+                    >
                       <Edit className="h-4 w-4" />
                     </button>
                     <button className="text-red-600 hover:text-red-700">
@@ .. @@
           </tbody>
         </table>
       </div>
+      
+      <ProductForm
+        product={selectedProduct}
+        isOpen={isFormOpen}
+        onClose={() => setIsFormOpen(false)}
+        onSave={handleSaveProduct}
+      />
     </div>
   );
 };

+const Categories: React.FC = () => {
+  const [categories] = useState(mockCategories);
+  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
+  const [isFormOpen, setIsFormOpen] = useState(false);
+
+  const handleAddCategory = () => {
+    setSelectedCategory(undefined);
+    setIsFormOpen(true);
+  };
+
+  const handleEditCategory = (category: Category) => {
+    setSelectedCategory(category);
+    setIsFormOpen(true);
+  };
+
+  const handleSaveCategory = (categoryData: Partial<Category>) => {
+    // In a real app, this would make an API call
+    console.log('Saving category:', categoryData);
+  };
+
+  return (
+    <div className="space-y-6">
+      <div className="flex justify-between items-center">
+        <div>
+          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
+          <p className="text-gray-600">Organize your products into categories</p>
+        </div>
+        <button 
+          onClick={handleAddCategory}
+          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
+        >
+          <Plus className="h-5 w-5" />
+          <span>Add Category</span>
+        </button>
+      </div>
+      
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+        {categories.map((category) => (
+          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
+            <img
+              src={category.image}
+              alt={category.name}
+              className="w-full h-48 object-cover"
+            />
+            <div className="p-4">
+              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
+              <p className="text-sm text-gray-600 mb-4">{category.productsCount} products</p>
+              <div className="flex justify-between items-center">
+                <span className="text-sm text-gray-500">/{category.slug}</span>
+                <div className="flex space-x-2">
+                  <button 
+                    onClick={() => handleEditCategory(category)}
+                    className="text-blue-600 hover:text-blue-700"
+                  >
+                    <Edit className="h-4 w-4" />
+                  </button>
+                  <button className="text-red-600 hover:text-red-700">
+                    <Trash2 className="h-4 w-4" />
+                  </button>
+                </div>
+              </div>
+            </div>
+          </div>
+        ))}
+      </div>
+      
+      <CategoryForm
+        category={selectedCategory}
+        isOpen={isFormOpen}
+        onClose={() => setIsFormOpen(false)}
+        onSave={handleSaveCategory}
+      />
+    </div>
+  );
+};
+
 const Orders: React.FC = () => {
-  const orders = [
-    { id: '001', customer: 'John Doe', total: 99.99, status: 'completed' },
-    { id: '002', customer: 'Jane Smith', total: 149.99, status: 'processing' },
-    { id: '003', customer: 'Bob Johnson', total: 79.99, status: 'shipped' },
-  ];
+  const [orders] = useState(mockRecentOrders);
+  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
+  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
+
+  const handleViewOrder = (order: Order) => {
+    setSelectedOrder(order);
+    setIsDetailsOpen(true);
+  };
+
+  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
+    // In a real app, this would make an API call
+    console.log('Updating order status:', orderId, status);
+  };

   return (
     <div className="space-y-6">
-      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
+      <div>
+        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
+        <p className="text-gray-600">Track and manage customer orders</p>
+      </div>
       
       <div className="bg-white shadow rounded-lg overflow-hidden">
         <table className="min-w-full divide-y divide-gray-200">
@@ .. @@
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Customer
               </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Items
+              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Total
               </th>
@@ .. @@
                 Status
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Date
+              </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Actions
               </th>
             </tr>
@@ .. @@
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
-                  {order.customer}
+                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
+                </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
-                  ${order.total}
+                  ${order.total.toFixed(2)}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 py-1 text-xs rounded-full ${
-                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
+                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                     order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
-                    'bg-blue-100 text-blue-800'
+                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
+                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
+                    'bg-gray-100 text-gray-800'
                   }`}>
                     {order.status}
                   </span>
                 </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  {new Date(order.createdAt).toLocaleDateString()}
+                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
-                  <button className="text-blue-600 hover:text-blue-700">
+                  <button 
+                    onClick={() => handleViewOrder(order)}
+                    className="text-blue-600 hover:text-blue-700"
+                  >
                     View Details
                   </button>
                 </td>
@@ .. @@
           </tbody>
         </table>
       </div>
+      
+      <OrderDetails
+        order={selectedOrder}
+        isOpen={isDetailsOpen}
+        onClose={() => setIsDetailsOpen(false)}
+        onUpdateStatus={handleUpdateStatus}
+      />
     </div>
   );
 };

+const Customers: React.FC = () => {
+  const mockCustomers = [
+    { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 299.95, joinDate: '2024-01-15' },
+    { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: 189.97, joinDate: '2024-01-10' },
+    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 8, totalSpent: 599.92, joinDate: '2024-01-05' },
+  ];
+
+  return (
+    <div className="space-y-6">
+      <div>
+        <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
+        <p className="text-gray-600">View and manage customer accounts</p>
+      </div>
+      
+      <div className="bg-white shadow rounded-lg overflow-hidden">
+        <table className="min-w-full divide-y divide-gray-200">
+          <thead className="bg-gray-50">
+            <tr>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Customer
+              </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Email
+              </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Orders
+              </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Total Spent
+              </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Join Date
+              </th>
+              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
+                Actions
+              </th>
+            </tr>
+          </thead>
+          <tbody className="bg-white divide-y divide-gray-200">
+            {mockCustomers.map((customer) => (
+              <tr key={customer.id}>
+                <td className="px-6 py-4 whitespace-nowrap">
+                  <div className="flex items-center">
+                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
+                      <UserCheck className="h-5 w-5 text-gray-600" />
+                    </div>
+                    <div className="ml-4">
+                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
+                    </div>
+                  </div>
+                </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  {customer.email}
+                </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  {customer.orders}
+                </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  ${customer.totalSpent.toFixed(2)}
+                </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
+                  {new Date(customer.joinDate).toLocaleDateString()}
+                </td>
+                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
+                  <button className="text-blue-600 hover:text-blue-700 mr-3">
+                    View Profile
+                  </button>
+                  <button className="text-red-600 hover:text-red-700">
+                    Suspend
+                  </button>
+                </td>
+              </tr>
+            ))}
+          </tbody>
+        </table>
+      </div>
+    </div>
+  );
+};
+
+const Analytics: React.FC = () => {
+  return (
+    <div className="space-y-8">
+      <div>
+        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
+        <p className="text-gray-600">Detailed insights into your business performance</p>
+      </div>
+
+      {/* Key Metrics */}
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
+          <div className="flex items-center">
+            <div className="p-3 rounded-full bg-blue-100">
+              <Eye className="h-6 w-6 text-blue-600" />
+            </div>
+            <div className="ml-4">
+              <p className="text-sm font-medium text-gray-500">Page Views</p>
+              <p className="text-2xl font-bold text-gray-900">24,567</p>
+              <p className="text-sm text-green-600">+12% from last week</p>
+            </div>
+          </div>
+        </div>
+
+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
+          <div className="flex items-center">
+            <div className="p-3 rounded-full bg-green-100">
+              <TrendingUp className="h-6 w-6 text-green-600" />
+            </div>
+            <div className="ml-4">
+              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
+              <p className="text-2xl font-bold text-gray-900">3.24%</p>
+              <p className="text-sm text-green-600">+0.5% from last week</p>
+            </div>
+          </div>
+        </div>

+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
+          <div className="flex items-center">
+            <div className="p-3 rounded-full bg-yellow-100">
+              <DollarSign className="h-6 w-6 text-yellow-600" />
+            </div>
+            <div className="ml-4">
+              <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
+              <p className="text-2xl font-bold text-gray-900">$67.89</p>
+              <p className="text-sm text-red-600">-2% from last week</p>
+            </div>
+          </div>
+        </div>

+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
+          <div className="flex items-center">
+            <div className="p-3 rounded-full bg-purple-100">
+              <Users className="h-6 w-6 text-purple-600" />
+            </div>
+            <div className="ml-4">
+              <p className="text-sm font-medium text-gray-500">Active Users</p>
+              <p className="text-2xl font-bold text-gray-900">1,234</p>
+              <p className="text-sm text-green-600">+8% from last week</p>
+            </div>
+          </div>
+        </div>
+      </div>

+      {/* Charts */}
+      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
+        <Chart
+          title="Revenue Trend (Last 6 Months)"
+          data={mockSalesData}
+          type="line"
+        />
+        <Chart
+          title="User Activity Distribution"
+          data={mockUserActivityData}
+          type="pie"
+        />
+      </div>

+      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
+        <Chart
+          title="Daily Traffic (This Week)"
+          data={mockTrafficData}
+          type="bar"
+        />
+        <Chart
+          title="Product Performance"
+          data={mockTopProducts}
+          type="bar"
+        />
+      </div>
+    </div>
+  );
+};
+
 const Admin: React.FC = () => {
   const location = useLocation();

   const navigation = [
     { name: 'Dashboard', href: '/admin', icon: BarChart3 },
     { name: 'Products', href: '/admin/products', icon: Package },
+    { name: 'Categories', href: '/admin/categories', icon: Grid },
     { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
     { name: 'Customers', href: '/admin/customers', icon: Users },
+    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
     { name: 'Settings', href: '/admin/settings', icon: Settings },
   ];

@@ .. @@
           {/* Sidebar */}
           <div className="lg:col-span-1">
             <div className="bg-white shadow rounded-lg p-6">
-              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Panel</h2>
+              <div className="flex items-center space-x-3 mb-6">
+                <div className="bg-blue-600 text-white p-2 rounded-lg">
+                  <BarChart3 className="h-6 w-6" />
+                </div>
+                <div>
+                  <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
+                  <p className="text-sm text-gray-500">NextGen Dashboard</p>
+                </div>
+              </div>
               <nav className="space-y-2">
@@ .. @@
             <Routes>
               <Route path="/" element={<Dashboard />} />
               <Route path="/products" element={<Products />} />
+              <Route path="/categories" element={<Categories />} />
               <Route path="/orders" element={<Orders />} />
-              <Route path="/customers" element={<div>Customers</div>} />
+              <Route path="/customers" element={<Customers />} />
+              <Route path="/analytics" element={<Analytics />} />
               <Route path="/settings" element={<div>Settings</div>} />
             </Routes>
           </div>