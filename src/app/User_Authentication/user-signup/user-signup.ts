import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Header } from '../../header/header';

@Component({
  selector: 'app-user-signup',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-signup.html',
  styleUrls: ['./user-signup.css']
})
export class UserSignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
  if (this.signupForm.valid) {
    const newUser = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Check if email already exists
    this.http.get<any[]>(`http://localhost:3000/users?email=${encodeURIComponent(newUser.email)}`)
      .subscribe((existing: string | any[]) => {
        if (existing.length > 0) {
          alert('Email is already registered!');
        } else {
          // Save new user
          this.http.post('http://localhost:3000/users', newUser)
            .subscribe(() => {
              alert('Signup successful!');
              this.router.navigate(['/login']);
            });
        }
      });
  }
}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
