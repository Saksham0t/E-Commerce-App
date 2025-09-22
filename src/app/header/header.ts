import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../Shopping_Cart/cart-service';
import { AuthService } from '../User_Authentication/services/auth.service';
import { UserLoginComponent } from '../User_Authentication/user-login/user-login';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserSignupComponent } from '../User_Authentication/user-signup/user-signup';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  userName: string = 'Guest';
  cartCount = 0;
  isLoggedIn = false;

  private loginDialogRef: MatDialogRef<UserLoginComponent> | null = null;

  constructor(
    public router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);
    this.authService.userName$.subscribe(name => this.userName = name);
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

    const storedName = this.authService.getUserName();
    if (storedName) this.userName = storedName;
  }

  get showHeader(): boolean {
    return !this.router.url.startsWith('/admin');
  }

  logout(): void {
    this.authService.logout();
  }

  openLogin(): void {
    if (this.loginDialogRef) return; // prevent multiple popups

    this.loginDialogRef = this.dialog.open(UserLoginComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    this.loginDialogRef.afterClosed().subscribe((result: any) => {
      this.loginDialogRef = null;
      if (result === 'open-signup') {
        this.openSignup();
      }
    });
  }

  openSignup(): void {
    const signupDialogRef = this.dialog.open(UserSignupComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    signupDialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'open-login') {
        this.openLogin();
      }
    });
  }
}
