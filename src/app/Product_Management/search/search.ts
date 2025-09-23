import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Shopping_Cart/cart-service';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';

@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {

  constructor(private someObj:CartService,private someDiffObj:Rest1,private Route:ActivatedRoute){}

  searchTerm:string="";
  productList:ProductsList[]=[];
  addedToCart = new Set<string>();

  getProductsfromService() {
    this.someDiffObj.getData("/ProductsList").subscribe({
      next: (data) => { this.productList = data },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..')
    })
  }

  ngOnInit() {
    this.getProductsfromService();
    this.Route.queryParams.subscribe(params => {
    this.searchTerm = params['name'] || params['category']||'';
  });
  }

  addToCart(product: ProductsList): void {
      this.someObj.addToCart(product, 1).subscribe({
        next: () => {
          console.log('Added to cart:', product.name);
          // Store the string ID
          this.addedToCart.add(product.id);
        },
        error: (err) => console.error('Error adding to cart', err),
      });
    }



  getFilteredProducts() {
    if (this.searchTerm == '') {
      return this.productList;
    }
    else {
      return this.productList.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())||
        product.Category.toLowerCase().includes(this.searchTerm.toLowerCase())||
        product.Description.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  }

}
