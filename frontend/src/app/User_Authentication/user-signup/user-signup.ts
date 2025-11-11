import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './user-signup.html',
  styleUrls: ['./user-signup.css'],
})
export class UserSignupComponent {
  signupForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSignupComponent>
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),],],
      password: ['', [Validators.required, Validators.minLength(8)]],
      shippingAddress: ['', Validators.required],
      paymentDetails: ['', Validators.required],
    });
  }
 
  onSubmit(): void {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
 
      this.authService.signup(signupData).subscribe({
        next: () => {
          localStorage.setItem('signedUpEmail', signupData.email);
          this.signupForm.setErrors({ signupSuccess: true });
 
          setTimeout(() => {
            this.dialogRef.close();
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err) => {
          if (err.status === 409) {
            this.signupForm.setErrors({ userExists: true });
          } else {
            this.signupForm.setErrors({ signupFailed: true });
          }
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }
 
  switchToLogin(): void {
    this.dialogRef.close('open-login');
  }
}