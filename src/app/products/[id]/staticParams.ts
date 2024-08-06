// src/params.ts

import SHOP_DATA from '@/shop_data'; // Adjust the import path if necessary

// Define the type for product data
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
}

// Define the type for the params object
interface Params {
  params: {
    id: string;
  };
}

// Function to get product by ID
export const getProductById = (id: number): Product | undefined => {
  return SHOP_DATA.find((product) => product.id === id);
};

// Example usage
export const getProductDetail = (params: Params): Product | undefined => {
  const { id } = params;
  const productId = parseInt(id, 10);
  return getProductById(productId);
};
