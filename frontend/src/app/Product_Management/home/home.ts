import { Component, HostListener, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { CartService } from '../../Shopping_Cart/cart-service';
import { AuthService } from '../../User_Authentication/services/auth.service';
import { DialogManagerService } from '../../User_Authentication/services/dialog-manager.service';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  providers: [Rest1],
})
export class Home implements OnInit {
  
  productsByCategory: { [key: string]: ProductsList[] } = {};
  products: ProductsList[] = [];
  addedToCart = new Set<string>();

  // Scroll to top button
  showScrollTopButton = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTopButton = scrollY > 300;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  carouselItems = [
    '../../../assets/Womens.mp4',
    '../../../assets/NewSeason.mp4',
    '../../../assets/Sneakers.mp4',
    '../../../assets/Tech.mp4',
    '../../../assets/Makeup.mp4',
    '../../../assets/Mens.png',
    '../../../assets/Watch.mp4',
  ];

  constructor(
    private productService: Rest1,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private dialogManager: DialogManagerService
  ) {}

  ngOnInit(): void {
    this.getProductsfromService();
    this.syncCartState();
  }

  getProductsfromService() {
    this.productService.getData('/products').subscribe({
      next: (data) => {
        this.products = data;
        const categories = [
          'Electronics', 'Accessories', 'T-shirts', 'Footwear', 'Beauty', 'Watches', 'Sports', 
          'Fashion Wear (Male)', 'Fashion Wear (Ladies)', 'Books', 'Kitchen', 'Grocery',
        ];
        categories.forEach((cat) => {
          this.productsByCategory[cat] = this.getProductsByCategory(cat);
        });
      },
      error: (err) => alert(JSON.stringify(err)),
    });
  }

  getProductsByCategory(category: string): ProductsList[] {
    return this.products.filter((p) => p.category === category);
  }

  private syncCartState(): void {
    this.cartService.getCartItemsWithDetails().subscribe({
      next: (items) => {
        items.forEach((item) => {
          if (item.productid) {
            this.addedToCart.add(item.productid);
          }
        });
      },
      error: (err) => console.error('Error syncing cart state:', err),
    });
  }

  addToCart(product: ProductsList): void {
    if (!this.authService.isLoggedIn()) {
      this.dialogManager.openLogin();
      return;
    }
  
    this.cartService.addToCart(product, 1).subscribe({
      next: () => this.addedToCart.add(product.id),
      error: (err) => console.error('Error adding to cart', err),
    });
  }
}
