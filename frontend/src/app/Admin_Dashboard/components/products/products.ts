import { Component } from '@angular/core';
import ProductsList from '../../Interfaces/ProductsList';
import { Rest1 } from '../../Interfaces/rest1';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers:[Rest1,HttpClientModule]
})
export class Products {
  constructor(private productObj: Rest1) { }
  productList: ProductsList[] = [];
  selectedSort!: string;
  searchTerm: string = '';
  selectedProduct: any = null;
  showAddModal: boolean = false;

  getProductsfromService() {
    this.productObj.getData("/products").subscribe({
      next: (data) => { this.productList = data },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..')
    })
  }
  ngOnInit() {
    this.getProductsfromService();
  }
  newProduct = {
    id: '',
    name: '',
    price: 0,
    category: '',
    description: '',
    imageUrl: ''
  };

  openAddModal() {
    this.showAddModal = true;
    this.newProduct = {
      id: (this.productList.length + 101).toString(),
      name: '',
      price: 0,
      category: '',
      description: '',
      imageUrl: ''
    };
  }

  closeModal() {
    this.selectedProduct = null;
    this.showAddModal = false;
  }

  deleteProduct() {
    this.productObj.deleteRecord(this.selectedProduct).subscribe({
      next: (data) => { this.getProductsfromService() },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Delete Operation')
    })
    this.closeModal();
  }



  addProduct() {
    this.productObj.insertProductData(this.newProduct).subscribe({
      next: (data) => {
        alert('Insert operation'); this.getProductsfromService();
      },
      error: (err) => {
        alert(JSON.stringify(err));
      },
      complete: () => console.log("insert is successful")
    })
    this.closeModal();
  }
  saveProduct() {
    const index = this.productList.findIndex(p => p.id === this.selectedProduct.id);
    if (index !== -1) {
      this.productList[index] = { ...this.selectedProduct };
    }
    this.productObj.updateRecord(this.selectedProduct).subscribe({
      next: (data) => { this.getProductsfromService(); },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log("Update operation is complete")
    })
    this.closeModal();
  }
  openManageModal(product: any) {
    this.selectedProduct = { ...product };
  }
  sortProducts() {
    if (this.selectedSort == "priceAsc") {
      return this.productList.sort(function (a, b) { return a.price - b.price });
    }
    else if (this.selectedSort == "priceDesc") {
      return this.productList.sort(function (a, b) { return b.price - a.price });
    }
    else if (this.selectedSort == "nameAsc") {
      return this.productList.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x > y) return 1;
        return -1;
      });
    }
    else if (this.selectedSort == "nameDesc") {
      return this.productList.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x > y) return -1;
        return 1;
      });
    }
    else return this.productList

  }
  getFilteredProducts() {
    if (this.searchTerm == '') {
      return this.productList;
    }
    else {
      return this.productList.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  }
}
