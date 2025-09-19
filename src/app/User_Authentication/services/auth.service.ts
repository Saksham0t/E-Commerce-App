import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/user-login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}