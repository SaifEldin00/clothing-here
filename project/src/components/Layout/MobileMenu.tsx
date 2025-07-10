import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';

const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.men'), href: '/shop/men' },
    { name: t('nav.women'), href: '/shop/women' },
    { name: t('nav.children'), href: '/shop/children' },
    { name: t('nav.brands'), href: '/shop/brands' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <>
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl md:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-gray-900">NextGen</span>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={toggleMobileMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;