import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../Shopping_Cart/cart-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  cartCount = 0;
  isLoggedIn = false; // Replace with real auth check later
  userName = 'Guest';

  constructor(
    public router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Subscribe to cart count updates
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Example: check login status (replace with real auth logic)
    // this.isLoggedIn = authService.isLoggedIn();
    // this.userName = authService.getUserName();
  }

  get showHeader(): boolean {
    return !this.router.url.startsWith('/admin');
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    // Add your logout logic here
    this.isLoggedIn = false;
    this.userName = 'Guest';
    this.router.navigate(['/home']);
  }
}
