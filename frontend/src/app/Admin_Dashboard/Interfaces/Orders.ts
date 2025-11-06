export interface Orders {
  id: string;
  userId: string;
  products: OrderedProduct[];
  totalPrice: number;
  orderDate: string; // ISO format date string
  shippingAddress: string;
  orderStatus: string; // restrict to known statuses
  paymentStatus: string;
  paymentMethod: string;
}

export interface OrderedProduct {
  productid: string;
  quantity: number;
}