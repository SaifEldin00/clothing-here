import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prisma } from '../lib/prisma';
import { Product } from '../types';

export const useProducts = (options?: { category?: string; featured?: boolean }) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      const where: any = {};
      
      if (options?.category) {
        where.category = options.category;
      }
      
      if (options?.featured) {
        where.featured = true;
      }

      return await prisma.product.findMany({ where });
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      return await prisma.product.findUnique({ where: { id } });
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      return await prisma.product.create({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      return await prisma.product.update({ where: { id }, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      return await prisma.product.delete({ where: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};