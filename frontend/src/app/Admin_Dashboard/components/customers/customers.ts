import { Component } from '@angular/core';
import Users from '../../Interfaces/Users';
import { Rest1 } from '../../Interfaces/rest1';
import { Orders } from '../../Interfaces/Orders';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-customers',
  imports: [CommonModule,FormsModule,HttpClientModule,RouterModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  providers:[Rest1,HttpClientModule]
})
export class Customers {
 
  constructor(private jsonservice:Rest1){}
  customersLst:Users[]=[];
  OrdersLst:Orders[]=[];
  showAddModal:boolean=false;
  getCustomersfromService(){
    this.jsonservice.getData("/users").subscribe({
      next:(data)=>{this.customersLst=data},
      error:(err)=>alert(JSON.stringify(err)),
      complete:()=>console.log("Getting data from backend")
    })
  }
  getOrdersfromService(){
    this.jsonservice.getData("/orders").subscribe({
      next:(data)=>{this.OrdersLst=data},
      error:(err)=>alert(JSON.stringify(err)),
      complete:()=>console.log("Getting data from backend")
    })
  }
  ngOnInit() {
    this.getCustomersfromService();
    this.getOrdersfromService();
  }
 
  selectedCustomerId: number | null = null;
 
  toggleDetails(id: number): void {
    this.selectedCustomerId = this.selectedCustomerId === id ? null : id;
  }
  selectedUser:any;
 
  openUserModal(customer: Users): void {
  this.selectedUser ={...customer} 
  this.showAddModal = true;
}
selectedCustomer!: Users;
selectedCustomerOrders: any[] | null = null;
 
openOrdersModal(customer: any): void {
  this.selectedCustomer = customer;
  this.selectedCustomerOrders = this.OrdersLst.filter(order => order.userId === customer.id);
  console.log(this.selectedCustomerOrders);
}
 
closeOrdersModal(): void {
  this.selectedCustomerOrders = null;
}
 
 
closeModal(): void {this.selectedUser = null;
  this.showAddModal = false;
}

  saveProduct() {
    const index = this.customersLst.findIndex(p => p.id === this.selectedUser.id);
    if (index !== -1) {
      this.customersLst[index] = { ...this.selectedUser };
    }
    this.jsonservice.updateCustomerRecord(this.selectedUser).subscribe({
      next:(data)=>{this.getCustomersfromService();},
      error:(err)=>alert(JSON.stringify(err)),
      complete:()=>console.log("Update operation is complete")
    })
    this.closeModal();
  }
 
}