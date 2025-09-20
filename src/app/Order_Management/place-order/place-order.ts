import { Component } from '@angular/core';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ProductList } from '../../Product_Management/product-list/product-list';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { Orders } from '../../Admin_Dashboard/Interfaces/Orders';
import { CartService } from '../../Shopping_Cart/cart-service';

@Component({
  selector: 'app-place-order',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './place-order.html',
  styleUrl: './place-order.css',
  providers:[Rest1,HttpClientModule]

})
export class PlaceOrder {
  constructor(private productObj: Rest1,private http: HttpClient,private cartService:CartService) { }
  CartItems: any[]=[];
  OrdersList: any[]=[];
  ProductsList:ProductsList[]=[];
  enrichedCart: any[] = [];
  showPaymentOptions = false;
  paymentMethods = ['UPI', 'Debit/Credit Card', 'Cash on Delivery', 'Net Banking'];
selectedPayment = '';


  async getCartItemsfromService(): Promise<void> {
  this.CartItems = await this.productObj.getData("/cartItems").toPromise();
  console.log("Cart items received:", this.CartItems);
}

async getProductsfromService(): Promise<void> {
  this.ProductsList = await this.productObj.getData("/ProductsList").toPromise();
  console.log("Products received:", this.ProductsList);
}

async getOrdersfromService(): Promise<void> {
  this.OrdersList = await this.productObj.getData("/OrdersList").toPromise();
  console.log("Orders received:", this.OrdersList);
}
  async ngOnInit():Promise<void>{
    await this.getCartItemsfromService();
    await this.getProductsfromService();
    await this.getOrdersfromService();
    this.enrichingCart();
  }

  enrichingCart(){
    this.enrichedCart = this.CartItems.map(cartItem => {
    const product = this.ProductsList.find(p => p.id === cartItem.Productid);
    return {
      ...cartItem,
      name: product?.name,
      image: product?.ImageURL,
      description: product?.Description
    };
  })
  }
  shipping = {
    name: '',
    phone: '',
    address: ''
  };

  getTotal(): number {
    return this.CartItems.reduce((sum, item) => sum + item.TotalPrice, 0)-this.getDiscountfromcartService();
  }
  getDiscountfromcartService():number{
    return Math.round(this.cartService.getDiscount());
  }

  submitOrder(): void {
const order: Orders = {
  Id: 'zz' + Math.floor(Math.random() * 10000), // internal tracking ID
  userId: '204',
  products: this.CartItems.map(item => ({
    id: item.Productid, // renamed to match OrderedProduct interface
    quantity: item.Quantity
  })),
  totalPrice: this.getTotal(),
  orderDate: new Date().toISOString().split('T')[0],
  ShippingAddress: this.shipping.address,
  orderStatus: 'Processing', // must be one of: 'Processing' | 'Confirmed' | 'Delivered' | 'Shipped'
  paymentStatus: 'Pending',
  paymentMethod: this.selectedPayment, // <-- Added required property
  id: 'zz' + Math.floor(Math.random() * 10000),
};


  this.productObj.insertOrderRecord(order).subscribe({
    next: (data) => {
      alert("Insert successful");
      this.getOrdersfromService(); 
    },
    error: (err) => alert("Insert failed: " + JSON.stringify(err))
  });
}
  };
