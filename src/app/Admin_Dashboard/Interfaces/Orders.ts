export interface Orders {
  Id: string;
  userId: string;
  products: OrderedProduct[];
  totalPrice: number;
  orderDate: string; // ISO format date string
  ShippingAddress: string;
  orderStatus: string; // restrict to known statuses
  paymentStatus: string;
  id: string; // internal tracking or frontend reference
}

export interface OrderedProduct {
  id: string;
  quantity: number;
}