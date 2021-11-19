export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface newProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export enum sortCases {
  asc = 'asc',
  desc = 'desc',
}
