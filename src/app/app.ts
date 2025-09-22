import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //s
//import { ProductList } from './Product_Management/product-list/product-list';//s

@Component({
  selector: 'app-root',
  imports: [Header, Footer,RouterModule,HttpClientModule,RouterOutlet],   //s-3
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
