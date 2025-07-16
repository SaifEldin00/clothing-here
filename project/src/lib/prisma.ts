// Frontend Prisma-like data management
// This simulates Prisma functionality for frontend-only data management

interface DatabaseSchema {
  products: any[];
  categories: any[];
  orders: any[];
  users: any[];
}

class FrontendPrisma {
  private data: DatabaseSchema;

  constructor() {
    // Initialize with data from localStorage or default data
    this.data = this.loadFromStorage();
  }

  private loadFromStorage(): DatabaseSchema {
    const stored = localStorage.getItem('nextgen-db');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default data structure
    return {
      products: [],
      categories: [],
      orders: [],
      users: []
    };
  }

  private saveToStorage() {
    localStorage.setItem('nextgen-db', JSON.stringify(this.data));
  }

  // Product operations
  product = {
    findMany: (options?: { where?: any; orderBy?: any; take?: number }) => {
      let products = [...this.data.products];
      
      if (options?.where) {
        products = products.filter(product => {
          return Object.keys(options.where).every(key => {
            const value = options.where[key];
            if (typeof value === 'object' && value.contains) {
              return product[key]?.toLowerCase().includes(value.contains.toLowerCase());
            }
            return product[key] === value;
          });
        });
      }

      if (options?.orderBy) {
        const [field, direction] = Object.entries(options.orderBy)[0];
        products.sort((a, b) => {
          if (direction === 'desc') {
            return b[field] > a[field] ? 1 : -1;
          }
          return a[field] > b[field] ? 1 : -1;
        });
      }

      if (options?.take) {
        products = products.slice(0, options.take);
      }

      return Promise.resolve(products);
    },

    findUnique: (options: { where: { id: string } }) => {
      const product = this.data.products.find(p => p.id === options.where.id);
      return Promise.resolve(product || null);
    },

    create: (options: { data: any }) => {
      const newProduct = {
        ...options.data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.data.products.push(newProduct);
      this.saveToStorage();
      return Promise.resolve(newProduct);
    },

    update: (options: { where: { id: string }; data: any }) => {
      const index = this.data.products.findIndex(p => p.id === options.where.id);
      if (index !== -1) {
        this.data.products[index] = {
          ...this.data.products[index],
          ...options.data,
          updatedAt: new Date().toISOString()
        };
        this.saveToStorage();
        return Promise.resolve(this.data.products[index]);
      }
      return Promise.reject(new Error('Product not found'));
    },

    delete: (options: { where: { id: string } }) => {
      const index = this.data.products.findIndex(p => p.id === options.where.id);
      if (index !== -1) {
        const deleted = this.data.products.splice(index, 1)[0];
        this.saveToStorage();
        return Promise.resolve(deleted);
      }
      return Promise.reject(new Error('Product not found'));
    }
  };

  // Category operations
  category = {
    findMany: () => {
      return Promise.resolve([...this.data.categories]);
    },

    create: (options: { data: any }) => {
      const newCategory = {
        ...options.data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.data.categories.push(newCategory);
      this.saveToStorage();
      return Promise.resolve(newCategory);
    },

    update: (options: { where: { id: string }; data: any }) => {
      const index = this.data.categories.findIndex(c => c.id === options.where.id);
      if (index !== -1) {
        this.data.categories[index] = {
          ...this.data.categories[index],
          ...options.data,
          updatedAt: new Date().toISOString()
        };
        this.saveToStorage();
        return Promise.resolve(this.data.categories[index]);
      }
      return Promise.reject(new Error('Category not found'));
    },

    delete: (options: { where: { id: string } }) => {
      const index = this.data.categories.findIndex(c => c.id === options.where.id);
      if (index !== -1) {
        const deleted = this.data.categories.splice(index, 1)[0];
        this.saveToStorage();
        return Promise.resolve(deleted);
      }
      return Promise.reject(new Error('Category not found'));
    }
  };

  // Order operations
  order = {
    findMany: (options?: { where?: any; include?: any }) => {
      return Promise.resolve([...this.data.orders]);
    },

    create: (options: { data: any }) => {
      const newOrder = {
        ...options.data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.data.orders.push(newOrder);
      this.saveToStorage();
      return Promise.resolve(newOrder);
    },

    update: (options: { where: { id: string }; data: any }) => {
      const index = this.data.orders.findIndex(o => o.id === options.where.id);
      if (index !== -1) {
        this.data.orders[index] = {
          ...this.data.orders[index],
          ...options.data,
          updatedAt: new Date().toISOString()
        };
        this.saveToStorage();
        return Promise.resolve(this.data.orders[index]);
      }
      return Promise.reject(new Error('Order not found'));
    }
  };

  // User operations
  user = {
    findMany: () => {
      return Promise.resolve([...this.data.users]);
    },

    findUnique: (options: { where: { id: string } }) => {
      const user = this.data.users.find(u => u.id === options.where.id);
      return Promise.resolve(user || null);
    },

    create: (options: { data: any }) => {
      const newUser = {
        ...options.data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.data.users.push(newUser);
      this.saveToStorage();
      return Promise.resolve(newUser);
    }
  };

  // Initialize with mock data
  async seed() {
    const { mockProducts, mockCategories } = await import('../data/mockData');
    const { mockRecentOrders } = await import('../data/adminData');
    
    if (this.data.products.length === 0) {
      this.data.products = mockProducts;
    }
    if (this.data.categories.length === 0) {
      this.data.categories = mockCategories;
    }
    if (this.data.orders.length === 0) {
      this.data.orders = mockRecentOrders;
    }
    
    this.saveToStorage();
  }
}

// Create singleton instance
export const prisma = new FrontendPrisma();

// Initialize with mock data on first load
prisma.seed();

export default prisma;