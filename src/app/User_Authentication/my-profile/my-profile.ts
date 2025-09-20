import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  orders: any[] = [];
  products: any[] = [];
  selectedOrder: any = null;
  isLoading = true;

  // track which section is active
  activeTab: 'profile' | 'orders' | 'settings' = 'profile';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    // fetch user
    this.http.get<any[]>(`http://localhost:3000/users?id=${userId}`).subscribe({
      next: (users) => (this.user = users[0] || {})
    });

    // fetch orders
    this.http.get<any[]>(`http://localhost:3000/OrdersList?userId=${userId}`).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      }
    });

    // fetch products
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
}
