import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Globe,
  ShoppingBag,
  Menu
} from 'lucide-react';
import { useUIStore } from '../../../stores/useUIStore';
import { useUserStore } from '../../../stores/useUserStore';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleSidebar }) => {
  const { t, i18n } = useTranslation(['common', 'admin']);
  const { language, setLanguage } = useUIStore();
  const { user, logout } = useUserStore();

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NextGen</h1>
              <p className="text-sm text-gray-500">{t('admin:common.loading', 'Admin Panel')}</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('common:common.search')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={handleLanguageToggle}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <Globe className="h-5 w-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.firstName || 'Admin'}
              </span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  {t('admin:common.settings', 'Settings')}
                </a>
                <hr className="my-1" />
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  {t('common:nav.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;