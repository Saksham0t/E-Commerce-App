import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../services/user';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-signup.html'
})
export class UserSignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;

      // Generate a custom userId
      const generatedId = 'USR-' + Math.floor(1000 + Math.random() * 9000);

      const newUser: User = {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        userId: generatedId
      };

      this.userService.addUser(newUser).subscribe(() => {
        alert(`Signup successful! Your User ID is ${generatedId}`);
        this.router.navigate(['/user-login']);
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  goToLogin() {
    this.router.navigate(['/user-login']);
  }
}
