import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUIStore } from './stores/useUIStore';
import { useTranslation } from 'react-i18next';
import './i18n';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MobileMenu from './components/Layout/MobileMenu';
import Cart from './components/Cart/Cart';
import SearchModal from './components/Search/SearchModal';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { language, theme } = useUIStore();
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = theme;
    document.documentElement.lang = language;
  }, [language, theme, i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <div className={`min-h-screen bg-white ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            <Routes>
              {/* Admin Routes - No Header/Footer */}
              <Route path="/admin/*" element={<Admin />} />
              
              {/* Public Routes - With Header/Footer */}
              <Route path="/*" element={
                <>
                  <Header />
                  <MobileMenu />
                  <Cart />
                  <SearchModal />
                  
                  <main className="pt-16">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/shop/:category" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/account/*" element={<Account />} />
                      <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                  </main>
                  
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;