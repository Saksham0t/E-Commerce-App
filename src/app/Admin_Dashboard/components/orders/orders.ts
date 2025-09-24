import { Component } from '@angular/core';
import { Rest1 } from '../../Interfaces/rest1';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
  providers:[Rest1,HttpClientModule]
})
export class Orders {
  constructor(private productObj: Rest1) { }
  CustomersList!: any[]
  OrdersList!: any[]
  ProductsList!: any[]

  getProductsfromService(): Promise<void> {
  return this.productObj.getData("/ProductsList").toPromise().then(products => {
    this.ProductsList = products;
  });
}

getOrdersfromService(): Promise<void> {
  return this.productObj.getData("/OrdersList").toPromise().then(orders => {
    this.OrdersList = orders;
  });
}

getCustomersfromService(): Promise<void> {
  return this.productObj.getData("/users").toPromise().then(customers => {
    this.CustomersList = customers;
  });
}

  
 
  async ngOnInit() {
  await this.getProductsfromService();
  await this.getCustomersfromService();
  await this.getOrdersfromService();
}

  selectedOrderId: number | null = null;

  searchTerm: string = '';

  getFilteredOrders() {
    if(this.searchTerm==""){
      return this.OrdersList;
    }
    return this.OrdersList.filter(order =>
      order.id.toString().includes(this.searchTerm) ||
      this.getCustomerName(order.userId).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleDetails(orderId: number): void {
    this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
  }

  updateOrderStatus(orderId: number, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    const order = this.OrdersList.find(o => o.id === orderId);
    if (order) order.orderStatus = newStatus;
    this.productObj.updateOrderRecord(order).subscribe({
      next: (data) => { this.getOrdersfromService(); },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log("Update operation is complete")
    })

  }
  updateOrderPaymentStatus(orderId: number, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    const order = this.OrdersList.find(o => o.id === orderId);
    if (order) order.paymentStatus = newStatus;
    this.productObj.updateOrderRecord(order).subscribe({
      next: (data) => { this.getOrdersfromService(); },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log("Update operation is complete")
    })

  }

  getCustomerName(userId: string): string {
    const customer = this.CustomersList.find(c => c.id === userId);
    return customer ? customer.Name : 'Unknown';
  }

  getProductDetails(productId: string) {
    return this.ProductsList.find(p => p.id === (productId));
  }
  }
