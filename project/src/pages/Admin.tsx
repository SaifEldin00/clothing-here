import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  Eye,
  UserCheck,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { mockAdminStats, mockSalesData, mockCategoryData, mockTopProducts, mockRecentOrders, mockTrafficData, mockUserActivityData } from '../data/adminData';
import StatsCard from '../components/Admin/Dashboard/StatsCard';
import Chart from '../components/Admin/Dashboard/Chart';
import ProductForm from '../components/Admin/Products/ProductForm';
import CategoryForm from '../components/Admin/Categories/CategoryForm';
import OrderDetails from '../components/Admin/Orders/OrderDetails';
import AdminLayout from '../components/Admin/Layout/AdminLayout';
import { Product, Category, Order } from '../types';

// Admin Components
const Dashboard: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('dashboard.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('dashboard.totalProducts')}
          value={mockAdminStats.totalProducts}
          change={mockAdminStats.monthlyGrowth.products}
          icon={Package}
          color="bg-blue-600"
        />
        <StatsCard
          title={t('dashboard.totalOrders')}
          value={mockAdminStats.totalOrders}
          change={mockAdminStats.monthlyGrowth.orders}
          icon={ShoppingCart}
          color="bg-green-600"
        />
        <StatsCard
          title={t('dashboard.totalCustomers')}
          value={mockAdminStats.totalCustomers.toLocaleString()}
          change={mockAdminStats.monthlyGrowth.customers}
          icon={Users}
          color="bg-purple-600"
        />
        <StatsCard
          title={t('dashboard.totalRevenue')}
          value={`$${mockAdminStats.totalRevenue.toLocaleString()}`}
          change={mockAdminStats.monthlyGrowth.revenue}
          icon={DollarSign}
          color="bg-yellow-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title={t('dashboard.monthlySales')}
          data={mockSalesData}
          type="line"
        />
        <Chart
          title={t('dashboard.salesByCategory')}
          data={mockCategoryData}
          type="pie"
        />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title={t('dashboard.topSellingProducts')}
          data={mockTopProducts}
          type="bar"
        />
        <Chart
          title={t('dashboard.weeklyTraffic')}
          data={mockTrafficData}
          type="line"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('dashboard.recentOrders')}
          </h3>
          <div className="space-y-4">
            {mockRecentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">
                    {t('orders.orderId')} #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  <p className={`text-sm capitalize ${
                    order.status === 'delivered' ? 'text-green-600' :
                    order.status === 'shipped' ? 'text-blue-600' :
                    order.status === 'processing' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {t(`orders.${order.status}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('dashboard.userActivity')}
          </h3>
          <div className="space-y-4">
            {mockUserActivityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">
                    {t(`dashboard.${item.name.toLowerCase().replace(' ', '')}`)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);
  const [products] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    console.log('Saving product:', productData);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('products.title')}
          </h1>
          <p className="text-gray-600 mt-1">{t('products.subtitle')}</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="h-5 w-5" />
          <span>{t('products.addProduct')}</span>
        </button>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common:common.product')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.category')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.price')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.stock')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('products.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="capitalize text-sm text-gray-900">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">${product.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? t('products.inStock') : t('products.outOfStock')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1 rounded transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <ProductForm
        product={selectedProduct}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

const Categories: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);
  const [categories] = useState(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddCategory = () => {
    setSelectedCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    console.log('Saving category:', categoryData);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('categories.title')}
          </h1>
          <p className="text-gray-600 mt-1">{t('categories.subtitle')}</p>
        </div>
        <button 
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="h-5 w-5" />
          <span>{t('categories.addCategory')}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {category.productsCount} {t('categories.products')}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">/{category.slug}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <CategoryForm
        category={selectedCategory}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

const Orders: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);
  const [orders] = useState(mockRecentOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    console.log('Updating order status:', orderId, status);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('orders.title')}
        </h1>
        <p className="text-gray-600 mt-1">{t('orders.subtitle')}</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.orderId')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.customer')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.items')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.total')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.status')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.date')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('orders.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.items.length} {order.items.length !== 1 ? 'items' : 'item'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {t(`orders.${order.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t('orders.viewDetails')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <OrderDetails
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

const Customers: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);
  const mockCustomers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 299.95, joinDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: 189.97, joinDate: '2024-01-10' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 8, totalSpent: 599.92, joinDate: '2024-01-05' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('customers.title')}
        </h1>
        <p className="text-gray-600 mt-1">{t('customers.subtitle')}</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.customer')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.email')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.orders')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.totalSpent')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.joinDate')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-700 mr-4">
                      {t('customers.viewProfile')}
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      {t('customers.suspend')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('analytics.title')}
        </h1>
        <p className="text-gray-600 mt-1">{t('analytics.subtitle')}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('analytics.pageViews')}</p>
              <p className="text-2xl font-bold text-gray-900">24,567</p>
              <p className="text-sm text-green-600">+12% {t('analytics.fromLastWeek')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('analytics.conversionRate')}</p>
              <p className="text-2xl font-bold text-gray-900">3.24%</p>
              <p className="text-sm text-green-600">+0.5% {t('analytics.fromLastWeek')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('analytics.avgOrderValue')}</p>
              <p className="text-2xl font-bold text-gray-900">$67.89</p>
              <p className="text-sm text-red-600">-2% {t('analytics.fromLastWeek')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('analytics.activeUsers')}</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-green-600">+8% {t('analytics.fromLastWeek')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title={t('analytics.revenueTrend')}
          data={mockSalesData}
          type="line"
        />
        <Chart
          title={t('analytics.userActivityDistribution')}
          data={mockUserActivityData}
          type="pie"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title={t('analytics.dailyTraffic')}
          data={mockTrafficData}
          type="bar"
        />
        <Chart
          title={t('analytics.productPerformance')}
          data={mockTopProducts}
          type="bar"
        />
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Settings Coming Soon</h2></div>} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;