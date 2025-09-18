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
  getOrdersfromService() {
    this.productObj.getData("/OrdersList").subscribe({
      next: (data) => { this.OrdersList = data },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log("Data from backend recieved")
    })
  }

  
  getProductsfromService() {
    this.productObj.getData("/ProductsList").subscribe({
      next: (data) => { this.ProductsList = data },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log("Data from backend recieved")
    })
  }
  getCustomersfromService() {
    this.productObj.getData("/users").subscribe({
      next: (data) => { console.log("Userss received:", data); this.CustomersList = data },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log("Data from backend recieved")
    })
  }
  ngOnInit() {
    this.getOrdersfromService();
    this.getProductsfromService();
    this.getCustomersfromService();
  }
  selectedOrderId: number | null = null;

  searchTerm: string = '';

  getFilteredOrders() {
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

  getCustomerName(userId: string): string {
    const customer = this.CustomersList.find(c => c.id === userId);
    return customer ? customer.Name : 'Unknown';
  }

  getProductDetails(productId: string) {
    return this.ProductsList.find(p => p.id === productId);
  }

}
