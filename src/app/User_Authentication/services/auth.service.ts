import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userNameSubject = new BehaviorSubject<string>('Guest');
  userName$ = this.userNameSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userNameSubject.next(storedName);
    }
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  login(id: string, name: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', name);
    this.userNameSubject.next(name);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.userNameSubject.next('Guest');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
