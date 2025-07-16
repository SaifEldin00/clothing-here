import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Users, Award, Truck } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';

const Home: React.FC = () => {
  const { t } = useTranslation(['common']);

  const featuredProducts = mockProducts.filter(product => product.featured);

  const stats = [
    { icon: ShoppingBag, value: '200+', label: t('stats.internationalBrands') },
    { icon: Users, value: '2,000+', label: t('stats.highQualityProducts') },
    { icon: Award, value: '30,000+', label: t('stats.happyCustomers') },
  ];

  const features = [
    {
      icon: Truck,
      title: t('features.freeDelivery'),
      description: t('features.freeDeliveryDesc'),
    },
    {
      icon: Award,
      title: t('features.qualityGuarantee'),
      description: t('features.qualityGuaranteeDesc'),
    },
    {
      icon: ShoppingBag,
      title: t('features.easyReturns'),
      description: t('features.easyReturnsDesc'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {t('hero.findClothes')}
                <br />
                {t('hero.thatMatches')}
                <br />
                {t('hero.yourStyle')}
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                {t('hero.description')}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors group"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fashion Model 1"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/8532622/pexels-photo-8532622.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fashion Model 2"
                  className="w-full h-64 object-cover rounded-lg shadow-lg mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('common.browse')} {t('common.categories')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('common.discover')} your perfect style from our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.productsCount} {t('common.products')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('common.newArrivals')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('common.discover')} the latest trends in fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {product.rating}/5
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;