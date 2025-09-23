import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { CartService } from '../../Shopping_Cart/cart-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [RouterModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [Rest1, HttpClientModule],
})
export class Home {
  productsByCategory: { [key: string]: ProductsList[] } = {};
  products: ProductsList[] = [];

  // Track added products by string ID
  addedToCart = new Set<string>();

  
  // --- Back to Top Button Logic ---
    showScrollTopButton = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  this.showScrollTopButton = scrollY > 300;
}

scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  // --- End Back to Top Button Logic ---


  constructor(private productService: Rest1, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProductsfromService();
  }

  getProductsfromService() {
    this.productService.getData('/ProductsList').subscribe({
      next: (data) => {
        this.products = data;
        const categories = ['Electronics', 'T-shirts', 'Footwear', 'Beauty', 'Sports', 'Toys', 'Fashion Wear (Male)', 'Fashion Wear (Ladies)', 'Books', 'Kitchen','Grocery'];
        categories.forEach((cat) => {
          this.productsByCategory[cat] = this.getProductsByCategory(cat);
        });
      },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..'),
    });
  }

  getProductsByCategory(category: string): ProductsList[] {
    return this.products.filter((p) => p.Category === category);
  }

  addToCart(product: ProductsList): void {
    this.cartService.addToCart(product, 1).subscribe({
      next: () => {
        console.log('Added to cart:', product.name);
        // Store the string ID
        this.addedToCart.add(product.id);
      },
      error: (err) => console.error('Error adding to cart', err),
    });
  }
}
