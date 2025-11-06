import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  orders: any[] = [];
  products: any[] = [];
  selectedOrder: any = null;
  isLoading = true;

  activeTab: 'profile' | 'orders' | 'settings' = 'profile';

  // Modal state
  modalField = '';
  modalLabel = '';
  modalValue = '';
  private modalRef: any = null;

  @ViewChild('updateFieldModal') updateFieldModal!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch user
    this.http.get<any[]>(`http://localhost:9090/api/v0/users?id=${userId}`).subscribe({
      next: (users) => (this.user = users[0] || {})
    });

    // Fetch orders
    this.http.get<any[]>(`http://localhost:9090/api/v0/orders?userId=${userId}`).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      }
    });

    // Fetch products
    this.http.get<any[]>(`http://localhost:9090/api/v0/products`).subscribe({
      next: (data) => (this.products = data)
    });
  }

  setTab(tab: 'profile' | 'orders' | 'settings') {
    this.activeTab = tab;
    this.selectedOrder = null;
  }

  viewOrderDetails(order: any) {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  getProductDetails(productid: string) {
    return this.products.find(p => p.id === productid);
  }

  // Open Bootstrap modal
  openUpdateModal(field: string, label: string) {
    this.modalField = field;
    this.modalLabel = label;
    this.modalValue = this.user[field] || '';

    if (this.updateFieldModal) {
      this.modalRef = new bootstrap.Modal(this.updateFieldModal.nativeElement, {
        backdrop: 'static',
        keyboard: true
      });
      this.modalRef.show();
    }
  }

  saveField() {
    if (this.modalValue.trim() === '') return;

    const updatedUser = { ...this.user, [this.modalField]: this.modalValue };
    this.http.put(`http://localhost:9090/api/v0/users/${this.user.id}`, updatedUser).subscribe({
      next: () => {
        this.user = updatedUser;
        if (this.modalRef) {
          this.modalRef.hide();
        }
      }
    });
  }
}
