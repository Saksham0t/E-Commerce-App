import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    console.log('Login Data:', {
      email: this.email,
      password: this.password
    });
    alert('Login successful!');
    // TODO: Call your login API here
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
