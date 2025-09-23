import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ✅ Use the global bootstrap object from angular.json scripts
declare const bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch user
    this.http.get<any[]>(`http://localhost:3000/users?id=${userId}`).subscribe({
      next: (users) => (this.user = users[0] || {})
    });

    // Fetch orders
    this.http.get<any[]>(`http://localhost:3000/OrdersList?userId=${userId}`).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      }
    });

    // Fetch products
    this.http.get<any[]>(`http://localhost:3000/ProductsList`).subscribe({
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

  getProductDetails(productId: string) {
    return this.products.find(p => p.id === productId);
  }

  // ✅ Open Bootstrap modal
  openUpdateModal(field: string, label: string) {
    this.modalField = field;
    this.modalLabel = label;
    this.modalValue = this.user[field] || '';

    const el = document.getElementById('updateFieldModal');
    if (el) {
      this.modalRef = new bootstrap.Modal(el, { backdrop: 'static', keyboard: false });
      this.modalRef.show();
    }
  }

  saveField() {
    if (this.modalValue.trim() === '') return;

    const updatedUser = { ...this.user, [this.modalField]: this.modalValue };
    this.http.put(`http://localhost:3000/users/${this.user.id}`, updatedUser).subscribe({
      next: () => {
        this.user = updatedUser;
        if (this.modalRef) {
          this.modalRef.hide();
        }
      }
    });
  }
}
