export interface Order {
  id: number;
  orderDate: string;
  orderItems: OrderItem[];
  subtotal: number;
  discount?: number;
  status: string;
  total: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface OrderToCreate {
  cartId: string;
  discount?: number;
}
