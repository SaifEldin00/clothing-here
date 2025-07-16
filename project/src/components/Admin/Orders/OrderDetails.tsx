import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../../../types';

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isOpen, onClose, onUpdateStatus }) => {
  const { t } = useTranslation(['admin', 'common']);

  if (!isOpen || !order) return null;

  const statusIcons = {
    pending: Package,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle,
  };

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-100',
    processing: 'text-blue-600 bg-blue-100',
    shipped: 'text-purple-600 bg-purple-100',
    delivered: 'text-green-600 bg-green-100',
    cancelled: 'text-red-600 bg-red-100',
  };

  const StatusIcon = statusIcons[order.status];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('orders.orderDetails')} - #{order.id}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${statusColors[order.status]}`}>
                  <StatusIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t('orders.orderStatus')}</p>
                  <p className="text-sm text-gray-600 capitalize">{t(`orders.${order.status}`)}</p>
                </div>
              </div>
              
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">{t('orders.pending')}</option>
                <option value="processing">{t('orders.processing')}</option>
                <option value="shipped">{t('orders.shipped')}</option>
                <option value="delivered">{t('orders.delivered')}</option>
                <option value="cancelled">{t('orders.cancelled')}</option>
              </select>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('orders.orderInformation')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('orders.orderDate')}:</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('orders.paymentMethod')}:</span>
                    <span className="text-gray-900 font-medium capitalize">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('orders.totalAmount')}:</span>
                    <span className="text-gray-900 font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('orders.shippingAddress')}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('orders.orderItems')}</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.product')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.sizeColor')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.quantity')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.price')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.total')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.size} / {item.color}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">{t('orders.totalAmount')}</span>
                <span className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;