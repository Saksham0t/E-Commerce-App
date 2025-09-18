import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-login.html'
})
export class UserLoginComponent {
  email = '';
  password = '';
  loginError = false;

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.getUsers().subscribe(users => {
      const foundUser = users.find(
        u => u.email === this.email && u.password === this.password
      );

      if (foundUser) {
        alert(`Login successful! Welcome ${foundUser.username} (User ID: ${foundUser.userId})`);
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/user-signup']);
  }
}
