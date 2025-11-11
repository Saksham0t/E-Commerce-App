import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../Shopping_Cart/cart-service';
import { AuthService } from '../User_Authentication/services/auth.service';
import { UserLoginComponent } from '../User_Authentication/user-login/user-login';
import { UserSignupComponent } from '../User_Authentication/user-signup/user-signup';
import { Rest1 } from '../Admin_Dashboard/Interfaces/rest1';
import ProductsList from '../Admin_Dashboard/Interfaces/ProductsList';
import { DialogManagerService } from '../User_Authentication/services/dialog-manager.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  userName: string = 'Guest';
  cartCount = 0;
  isLoggedIn = false;

  search: string = '';
  suggestions: string[] = [];
  productList: ProductsList[] = [];

  showCategories = true;
  activeCategory: string | null = null;

  categories: string[] = [
    'Grocery',
    'Beauty',
    'Electronics',
    'Footwear',
    'T-Shirts',
    'Watches',
    'Accessories',
    'Sports',
    'Kitchen',
    'Furniture',
  ];

  private loginDialogRef: MatDialogRef<UserLoginComponent> | null = null;
  private signupDialogRef: MatDialogRef<UserSignupComponent> | null = null;

  constructor(
    public router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
    private productService: Rest1,
    private dialogManager: DialogManagerService
  ) {}

  ngOnInit(): void {
    this.cartService.initCartState(); // restore cart count on refresh
    this.cartService.cartCount$.subscribe((count) => (this.cartCount = count));
    this.authService.userName$.subscribe((name) => (this.userName = name));
    this.authService.isLoggedIn$.subscribe((status) => (this.isLoggedIn = status));

    this.getProductsfromService();

    const storedName = this.authService.getUserName();
    if (storedName) this.userName = storedName;
  }

  get showHeader(): boolean {
    return !this.router.url.startsWith('/admin');
  }

  isNotAdminRoute(): boolean {
    return ![
      '/admin',
      '/admin-login',
      '/admin/orders',
      '/admin/customers',
      '/admin/products',
    ].includes(this.router.url);
  }

  // --- Product search ---
  getProductsfromService(): void {
    this.productService.getData('/products').subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => alert(JSON.stringify(err)),
    });
  }

  updateSuggestions(): void {
    const term = this.search.trim().toLowerCase();
    if (!term) {
      this.suggestions = [];
      return;
    }

    const allOptions = this.productList
      .map((p) => p.name)
      .concat(this.productList.map((p) => p.category));
    const uniqueOptions = Array.from(new Set(allOptions));

    this.suggestions = uniqueOptions.filter((opt) => opt?.toLowerCase().includes(term)).slice(0, 5);
  }

  searchNow(): void {
    const q = this.search.trim();
    if (!q) return;
    this.router.navigate(['/search'], { queryParams: { name: q } });
    this.suggestions = [];
  }

  selectSuggestion(suggestion: string): void {
    this.search = suggestion;
    this.suggestions = [];
    this.router.navigate(['/search'], { queryParams: { name: suggestion } });
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.router.navigate(['/search'], { queryParams: { category } });
  }

  // --- Auth ---
  logout(): void {
    this.authService.logout();
  }

  openLogin(): void {
    this.dialogManager.openLogin();
  }

  openSignup(): void {
    this.dialogManager.openSignup();
  }
}
