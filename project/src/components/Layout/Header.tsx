import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  Globe,
  ShoppingBag
} from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { useCartStore } from '../../stores/useCartStore';
import { useUserStore } from '../../stores/useUserStore';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    language, 
    mobileMenuOpen, 
    setLanguage, 
    toggleMobileMenu, 
    toggleSearch 
  } = useUIStore();
  const { toggleCart, getTotalItems } = useCartStore();
  const { user, isAuthenticated } = useUserStore();

  const totalItems = getTotalItems();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.men'), href: '/shop/men' },
    { name: t('nav.women'), href: '/shop/women' },
    { name: t('nav.children'), href: '/shop/children' },
    { name: t('nav.brands'), href: '/shop/brands' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">NextGen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Globe className="h-5 w-5 text-gray-600" />
            </button>

            {/* Search */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/account/wishlist"
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Heart className="h-5 w-5 text-gray-600" />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account */}
            {isAuthenticated ? (
              <Link
                to="/account"
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;