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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  userName: string = 'Guest';
  cartCount = 0;
  isLoggedIn = false;

  search: string = '';
  suggestions: string[] = [];
  productList: ProductsList[] = [];

  // Categories toggle + list
  showCategories = true; // open by default
  categories: string[] = ['Electronics', 'Footwear', 'T-Shirts', 'Watches', 'Accessories'];

  private loginDialogRef: MatDialogRef<UserLoginComponent> | null = null;

  constructor(
    public router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
    private someObj: Rest1
  ) {}

  ngOnInit(): void {
    // reactive UI state
    this.cartService.cartCount$.subscribe(count => (this.cartCount = count));
    this.authService.userName$.subscribe(name => (this.userName = name));
    this.authService.isLoggedIn$.subscribe(status => (this.isLoggedIn = status));

    // load products for suggestions
    this.getProductsfromService();

    const storedName = this.authService.getUserName();
    if (storedName) this.userName = storedName;
  }

  get showHeader(): boolean {
    // keep header hidden on admin routes
    return !this.router.url.startsWith('/admin');
  }

  isNotAdminRoute(): boolean {
  return this.router.url !== '/admin' && this.router.url!=='/admin-login';
}

  // API call to get products for suggestions
  getProductsfromService(): void {
    this.someObj.getData('/ProductsList').subscribe({
      next: data => {
        this.productList = data;
      },
      error: err => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..')
    });
  }

  // Search suggestions logic
  updateSuggestions(): void {
    const term = this.search.trim().toLowerCase();
    if (!term) {
      this.suggestions = [];
      return;
    }

    const allOptions = this.productList.map(p => p.name).concat(this.productList.map(p => p.Category));
    const uniqueOptions = Array.from(new Set(allOptions));

    this.suggestions = uniqueOptions
      .filter(opt => opt?.toLowerCase().includes(term))
      .slice(0, 5);
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

  // Categories interactions
  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  filterByCategory(category: string): void {
    this.router.navigate(['/search'], { queryParams: { category } });
    // keep it open or close after click — your choice
    // this.showCategories = false;
  }

  // Auth
  logout(): void {
    this.authService.logout();
  }

  openLogin(): void {
    if (this.loginDialogRef) return; // prevent multiple popups

    this.loginDialogRef = this.dialog.open(UserLoginComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    this.loginDialogRef.afterClosed().subscribe((result: any) => {
      this.loginDialogRef = null;
      if (result === 'open-signup') {
        this.openSignup();
      }
    });
  }

  openSignup(): void {
    const signupDialogRef = this.dialog.open(UserSignupComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    signupDialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'open-login') {
        this.openLogin();
      }
    });
  }
}
