import { Component } from '@angular/core';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { Orders } from '../../Admin_Dashboard/Interfaces/Orders';
import { CartService } from '../../Shopping_Cart/cart-service';
import { MatDialog } from '@angular/material/dialog';
import { OrderSuccessComponent } from '../order-sucess/order-sucess';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './place-order.html',
  styleUrl: './place-order.css',
  providers: [Rest1]
})
export class PlaceOrder {
  CartItems: any[] = [];
  OrdersList: any[] = [];
  ProductsList: ProductsList[] = [];
  enrichedCart: any[] = [];

  showPaymentOptions = false;
  paymentMethods = ['UPI', 'Debit/Credit Card', 'Cash on Delivery', 'Net Banking'];
  selectedPayment = '';

  shipping = {
    name: '',
    phone: '',
    address: ''
  };

  formSubmitted = false;

  constructor(
    private productObj: Rest1,
    private http: HttpClient,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCartItemsfromService();
    await this.getProductsfromService();
    await this.getOrdersfromService();
    this.enrichingCart();
  }

  async getCartItemsfromService(): Promise<void> {
    this.CartItems = await this.productObj.getData('/cart').toPromise();
  }

  async getProductsfromService(): Promise<void> {
    this.ProductsList = await this.productObj.getData('/products').toPromise();
  }

  async getOrdersfromService(): Promise<void> {
    this.OrdersList = await this.productObj.getData('/orders').toPromise();
  }

  enrichingCart(): void {
    this.enrichedCart = this.CartItems.map(cartItem => {
      const product = this.ProductsList.find(p => p.id === cartItem.productid);
      return {
        ...cartItem,
        name: product?.name,
        image: product?.imageUrl,
        description: product?.description
      };
    });
  }

  getTotal(): number {
    return this.CartItems.reduce((sum, item) => sum + item.totalPrice, 0) - this.getDiscountfromcartService();
  }

  getDiscountfromcartService(): number {
    return Math.round(this.cartService.getDiscount());
  }

  proceedToPayment(): void {
    this.formSubmitted = true;
    if (this.shipping.name && this.shipping.phone && this.shipping.address) {
      this.showPaymentOptions = true;
    }
  }

  submitOrder(): void {
    if (!this.shipping.name || !this.shipping.phone || !this.shipping.address || !this.selectedPayment) {
      return;
    }

    const orderId = 'zz' + Math.floor(Math.random() * 1000000) + Math.ceil(Math.random()*10000);

    const order: Orders = {
      id: orderId,
      userId: localStorage.getItem('userId') || '',
      products: this.CartItems.map(item => ({
        productid: item.productid,
        quantity: item.quantity
      })),
      totalPrice: this.getTotal(),
      orderDate: new Date().toISOString().split('T')[0],
      shippingAddress: this.shipping.address,
      orderStatus: 'Processing',
      paymentStatus: 'Done: Paid by '+this.selectedPayment,
      paymentMethod: this.selectedPayment,
    };

    this.productObj.insertOrderRecord(order).subscribe({
      next: () => {
        this.getOrdersfromService();

        // ✅ Open popup and prevent outside click close
        this.dialog.open(OrderSuccessComponent, {
          width: '500px',
          data: { orderId },
          disableClose: true,
          panelClass: 'order-success-dialog'
        });
      },
      error: (err) => alert('Insert failed: ' + JSON.stringify(err))
    });
  }
}
