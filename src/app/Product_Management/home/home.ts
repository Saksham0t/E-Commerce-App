import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';

@Component({
  selector: 'app-home',
  imports: [RouterModule,RouterOutlet,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers:[Rest1,HttpClientModule]
})
export class Home {

  productsByCategory: { [key: string]: ProductsList[] } = {};

  constructor(private productService: Rest1) {}

  products:ProductsList[]=[];

  getProductsfromService() {
    this.productService.getData("/ProductsList").subscribe({
      next: (data) => { this.products = data 
        const categories = ['T-shirts', 'Footwear','Electronics'];
    categories.forEach(cat => {
      this.productsByCategory[cat] = this.getProductsByCategory(cat);
    });
      },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..')
    })
  }

  ngOnInit(): void {
    this.getProductsfromService();
  }
  getProductsByCategory(category: string): ProductsList[] {
    return this.products.filter(p => p.Category === category);
  }

  addToCart(product: ProductsList): void {
    console.log('Added to cart:', product.name);
    // You can integrate a cart service here
  }

}
