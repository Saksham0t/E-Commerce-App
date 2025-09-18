export interface Orders {
  Id: string;
  userId: string;
  products: OrderedProduct[];
  totalPrice: number;
  orderDate: string; // ISO format date string
  ShippingAddress: string;
  orderStatus: 'Processing' | 'Confirmed' | 'Delivered' | 'Shipped'; // restrict to known statuses
  paymentStatus: 'Paid' | 'Pending';
  id: string; // internal tracking or frontend reference
}

export interface OrderedProduct {
  id: string;
  quantity: number;
}