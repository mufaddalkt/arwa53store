export type ProductCategory = 'Kada' | 'Bangle' | 'Mangalsutra' | 'Bracelet';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  hoverImageUrl?: string;
  tag?: string;
  specs: string[];
  inStock: boolean;
  desc?: string;
  badge?: string;
}
