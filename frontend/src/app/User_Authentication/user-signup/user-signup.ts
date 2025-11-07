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
  styleUrls: ['./user-signup.css']
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      shippingAddress: ['', Validators.required],
      paymentDetails: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const signupData = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        shippingAddress: this.signupForm.value.shippingAddress,
        paymentDetails: this.signupForm.value.paymentDetails
      };

      this.authService.signup(signupData).subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigate(['/home']);
        },
        error: () => {
          this.signupForm.setErrors({ signupFailed: true });
        }
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
