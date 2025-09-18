import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'header',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  cartItems = 0;

  constructor(public router: Router) {}

  // This will return false if the current URL starts with /admin
  get showHeader() {
    return !this.router.url.startsWith('/admin');
  }
}
