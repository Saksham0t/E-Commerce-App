import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { CartService } from '../../Shopping_Cart/cart-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [Rest1, HttpClientModule]
})
export class Home {

  productsByCategory: { [key: string]: ProductsList[] } = {};
  products: ProductsList[] = [];

  // ✅ Inject both Rest1 and CartService
  constructor(private productService: Rest1, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProductsfromService();
  }

  getProductsfromService() {
    this.productService.getData("/ProductsList").subscribe({
      next: (data) => { 
        this.products = data;
        const categories = ['T-shirts', 'Footwear', 'Electronics'];
        categories.forEach(cat => {
          this.productsByCategory[cat] = this.getProductsByCategory(cat);
        });
      },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..')
    });
  }

  getProductsByCategory(category: string): ProductsList[] {
    return this.products.filter(p => p.Category === category);
  }

  // ✅ Updated to use CartService
  addToCart(product: ProductsList): void {
    this.cartService.addToCart(product, 1).subscribe({
      next: () => console.log('Added to cart:', product.name),
      error: (err) => console.error('Error adding to cart', err)
    });
  }
}
