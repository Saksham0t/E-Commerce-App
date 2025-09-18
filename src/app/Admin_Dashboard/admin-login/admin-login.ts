import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../../header/header';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {
  adminId = '';
  password = '';
  errorMessage = '';

  // Hardcoded credentials for now
  private validAdminId = 'admin123';
  private validPassword = 'adminpass'; // 9 chars

  constructor(private router: Router) {}

  onLogin() {
    // Password length check
    if (this.password.length < 8 || this.password.length > 10) {
      this.errorMessage = 'Password must be between 8 and 10 characters.';
      return;
    }

    // Hardcoded validation
    if (this.adminId === this.validAdminId && this.password === this.validPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true'); // store login flag
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Invalid Admin ID or Password';
    }
  }
}
