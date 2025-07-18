import { nanoid } from 'nanoid';

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
  discounted?: boolean;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export class Cart implements Cart {
  id = nanoid();
  items: CartItem[] = [];
}
