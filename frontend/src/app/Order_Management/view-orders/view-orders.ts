import { Component } from '@angular/core';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { Orders } from '../../Admin_Dashboard/Interfaces/Orders';
import { CommonModule } from '@angular/common';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { CartService } from '../../Shopping_Cart/cart-service';

@Component({
  selector: 'app-view-orders',
  imports: [CommonModule],
  templateUrl: './view-orders.html',
  styleUrl: './view-orders.css'
})
export class ViewOrders {

  constructor(private someObj:Rest1,private cartService:CartService){}

  OrdersLst:any=[];
  Products:ProductsList[]=[];
  detailedOrder:any[]=[];
  id:any=localStorage.getItem('userId')?.toString();

  getOrdersfromService(){
    this.someObj.getData("/orders").subscribe({
      next:(data:Orders[])=>{
        this.OrdersLst=data.filter(order=>order.userId===this.id)
      }
    })
  }

  ngOnInit(){
    this.getOrdersfromService();
    this.getProductsfromService();
  }

  selectedOrder: any = null;

viewOrderDetails(order: any) {
  if (this.selectedOrder?.id === order.id) {
    // If already selected, toggle off
    this.selectedOrder = null;
  } else {
    // Otherwise, show the new order
    this.selectedOrder = order;
  }
}
getProductsfromService(){
  this.someObj.getData("/products").subscribe({
    next:(data)=>{this.Products=data}
  })
}

getProductDetails(productid: string) {
    return this.Products.find(p => p.id === productid);
  }

getDiscount(){
  return this.cartService.getDiscount();

}
getTotal(){
  return this.cartService.getTotalAmount();

}
}
