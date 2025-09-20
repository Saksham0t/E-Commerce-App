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
  
  userName: string = 'Guest';
  cartCount = 0;
  isLoggedIn = false; // Replace with real auth check later
  // dialog property removed to avoid duplicate identifier error

  constructor(
    public router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.userName$.subscribe((name: string) => this.userName = name);
    const storedName: string | null = this.authService.getUserName();
    if (storedName !== null && storedName !== undefined && storedName !== '') {
      this.userName = storedName;
    }
  }

  get showHeader(): boolean {
    return !this.router.url.startsWith('/admin');
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/home']);
  }

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
