// import { randomUUID } from 'crypto';
import type { ProductInput } from '../schemas/product.js';

export interface Product extends ProductInput {
  id: string;
}

export const db: Product[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Hasselblad 501C',
    description:
      'The Hasselblad 500 series began with the revolutionary 500C, one of the most iconic cameras in photographic history.',
    price: 35.567,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Yashica FX-103 Program',
    description:
      'This is one of my favorite hidden gems of the film world and can routinely be found .',
    price: 367,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Minolta X-570',
    description:
      'There are a plethora of great Minolta lenses available at very reasonable prices.',
    price: 700,
    category: 'electronics',
    inStock: true,
  },
];
