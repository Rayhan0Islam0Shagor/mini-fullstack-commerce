import { z } from 'zod';

export const createProductValidation = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  price: z.number().min(0),
  category: z.string().min(3).max(100),
  image: z.string().min(3).max(500),
  rating: z.number().min(0).max(5),
  stock: z.number().min(0),
});

export const updateProductValidation = z
  .object({
    id: z.number().min(1),
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(1000),
    price: z.number().min(0),
    category: z.string().min(3).max(100),
    image: z.string().min(3).max(500),
    rating: z.number().min(0).max(5),
    stock: z.number().min(0),
  })
  .partial();

export const ProductValidation = {
  createProductValidation,
  updateProductValidation,
};
