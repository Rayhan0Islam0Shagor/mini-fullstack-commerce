import { ApiResponse } from './common.types';

export interface Product {
  _id: string;
  id: number;
  name?: string; // Frontend name
  title?: string; // Backend title (backend returns this)
  description: string;
  price: number;
  category: string;
  image?: string;
  stock?: number;
  rating?: number;
  [key: string]: unknown;
}

export interface UseProductsOptions {
  searchTerm?: string;
  sort?: 'createdAt' | '-createdAt';
  category?: string;
  page?: number;
  limit?: number;
  fields?: string[];
  enabled?: boolean; // whether to fetch the data
}

export type ProductsResponse = ApiResponse<Product[]>;
export type ProductResponse = ApiResponse<Product>;
