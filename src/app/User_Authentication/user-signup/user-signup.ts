import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './user-signup.html',
  styleUrls: ['./user-signup.css']
})
export class UserSignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSignupComponent>
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const generatedId = Math.floor(1000 + Math.random() * 900);
      const newUser: User = {
        id: generatedId,
        Name: this.signupForm.value.username,
        Email: this.signupForm.value.email,
        Password: this.signupForm.value.password,
        ShippingAddress: '',
        PaymentDetails: ''
      };

      this.userService.addUser(newUser).subscribe(() => {
        this.authService.login(generatedId.toString());
        this.dialogRef.close();
        this.router.navigate(['/profile']);
      });
    }else {
    this.signupForm.markAllAsTouched();
  }
  }

  closeDialog() {
    this.dialogRef.close();
  }
switchToLogin() {
  this.dialogRef.close('open-login'); // send signal to open login dialog
}
}
