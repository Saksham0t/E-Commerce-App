import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../../Shopping_Cart/cart-service';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLoginComponent {
  name = '';
  password = '';
  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService, 
    public dialogRef: MatDialogRef<UserLoginComponent>
  ) {}

  onLogin(): void {
    this.authService.login(this.name, this.password).subscribe({
      next: () => {
        this.cartService.initCartState();

        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loginError = true;
      }
    });
  }

  goToSignup(): void {
    this.dialogRef.close('open-signup'); 
  }

}
