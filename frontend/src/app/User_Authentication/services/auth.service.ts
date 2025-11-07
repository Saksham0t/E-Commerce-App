import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userNameSubject = new BehaviorSubject<string>('Guest');
  userName$ = this.userNameSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private apiUrl = 'http://localhost:9090/api/v0/auth'; 

  constructor(private router: Router, private http: HttpClient) {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userNameSubject.next(storedName);
    }
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.jwt);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', username);
        localStorage.setItem('isLoggedIn', 'true');
        this.userNameSubject.next(username);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  signup(signupData: any) {
    return this.http.post<any>(`${this.apiUrl}/signup`, signupData);
  }

  logout() {
    localStorage.clear();
    this.userNameSubject.next('Guest');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/home']);
  }

  // ✅ New helper
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // exp is in seconds → convert to ms
      return Date.now() > expiry;
    } catch {
      return true; // treat malformed token as expired
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
}
