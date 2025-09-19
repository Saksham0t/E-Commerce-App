import { Component, NgModule, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OrderList } from './Order_Management/order-list/order-list';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterModule, OrderList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // @NgModule({
  //   declarations:[
  //     OrderList
  //   ]
  // })
}