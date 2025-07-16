import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3,
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Grid,
  TrendingUp,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['common', 'admin']);
  const location = useLocation();

  const navigation = [
    { 
      name: t('admin:dashboard.title', 'Dashboard'), 
      href: '/admin', 
      icon: BarChart3,
      exact: true
    },
    { 
      name: t('admin:products.title', 'Products'), 
      href: '/admin/products', 
      icon: Package 
    },
    { 
      name: t('admin:categories.title', 'Categories'), 
      href: '/admin/categories', 
      icon: Grid 
    },
    { 
      name: t('admin:orders.title', 'Orders'), 
      href: '/admin/orders', 
      icon: ShoppingCart 
    },
    { 
      name: t('admin:customers.title', 'Customers'), 
      href: '/admin/customers', 
      icon: Users 
    },
    { 
      name: t('admin:analytics.title', 'Analytics'), 
      href: '/admin/analytics', 
      icon: TrendingUp 
    },
    { 
      name: t('common:admin.settings'), 
      href: '/admin/settings', 
      icon: Settings 
    },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {t('admin:common.navigation', 'Navigation')}
            </h3>
          </div>

          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={`
                flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive(item.href, item.exact)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className={`h-5 w-5 ${
                isActive(item.href, item.exact) ? 'text-blue-600' : 'text-gray-500'
              }`} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            NextGen Admin v1.0
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;