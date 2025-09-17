import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  cartItems = 0;
}
