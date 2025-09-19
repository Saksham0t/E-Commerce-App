import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(userId: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
