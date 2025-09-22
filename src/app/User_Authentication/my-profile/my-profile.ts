import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
<<<<<<< HEAD
=======
import { FormsModule } from '@angular/forms';

// ✅ Use the global bootstrap object from angular.json scripts
declare const bootstrap: any;
>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4

@Component({
  selector: 'app-my-profile',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, HttpClientModule],
=======
  imports: [CommonModule, HttpClientModule, FormsModule],
>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  orders: any[] = [];
  products: any[] = [];
  selectedOrder: any = null;
  isLoading = true;

<<<<<<< HEAD
  // track which section is active
  activeTab: 'profile' | 'orders' | 'settings' = 'profile';

=======
  activeTab: 'profile' | 'orders' | 'settings' = 'profile';

  // Modal state
  modalField = '';
  modalLabel = '';
  modalValue = '';
  private modalRef: any = null;

>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

<<<<<<< HEAD
    // fetch user
=======
    // Fetch user
>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4
    this.http.get<any[]>(`http://localhost:3000/users?id=${userId}`).subscribe({
      next: (users) => (this.user = users[0] || {})
    });

<<<<<<< HEAD
    // fetch orders
=======
    // Fetch orders
>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4
    this.http.get<any[]>(`http://localhost:3000/OrdersList?userId=${userId}`).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      }
    });

<<<<<<< HEAD
    // fetch products
=======
    // Fetch products
>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4
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

<<<<<<< HEAD
  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  updateField(field: string, label: string) {
    const newValue = prompt(`Enter new ${label}:`, this.user[field] || '');
    if (newValue && newValue.trim() !== '') {
      const updatedUser = { ...this.user, [field]: newValue };
      this.http.put(`http://localhost:3000/users/${this.user.id}`, updatedUser).subscribe({
        next: () => (this.user = updatedUser)
      });
    }
  }
=======
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
>>>>>>> 7ccdfa2211f709f60b02af26a296c0a6c4533bd4
}
