import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../Shopping_Cart/cart-service';
import { AuthService } from '../User_Authentication/services/auth.service';
import { UserLoginComponent } from '../User_Authentication/user-login/user-login';
import { MatDialog } from '@angular/material/dialog';
import { UserSignupComponent } from '../User_Authentication/user-signup/user-signup';

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
  // dialog property removed to avoid duplicate identifier error

  constructor(
    public router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog
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
    this.authService.logout(); 
  }

  // openLogin() {
  //   this.dialog.open(UserLoginComponent, {
  //     width: '400px',
  //     panelClass: 'custom-dialog-container'
  //   });
  // }
openLogin() {
  const dialogRef = this.dialog.open(UserLoginComponent, {
    width: '400px',
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'open-signup') {
      this.openSignup();
    }
  });
}

openSignup() {
  const dialogRef = this.dialog.open(UserSignupComponent, {
    width: '400px',
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'open-login') {
      this.openLogin();
    }
  });
}
}
