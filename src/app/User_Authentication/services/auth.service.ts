import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getUserName(): string | null {
      return localStorage.getItem('userName');

    throw new Error('Method not implemented.');
  }
  userName$: any;
  constructor(private router: Router) {}

  login(id: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
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
