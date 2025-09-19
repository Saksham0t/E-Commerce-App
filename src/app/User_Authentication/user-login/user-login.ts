import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLoginComponent {
  email = '';
  password = '';
  loginError = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<UserLoginComponent>
  ) {}

  onLogin() {
    this.userService.getUsers().subscribe(users => {
      const foundUser = users.find(
        u => u.Email === this.email && u.Password === this.password
      );

      if (foundUser) {
        if (foundUser.id) {
          this.authService.login(foundUser.id.toString());
          this.dialogRef.close();
          this.router.navigate(['/profile']);
        } else {
          this.loginError = true;
        }
      } else {
        this.loginError = true;
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  switchToSignup() {
  this.dialogRef.close('open-signup'); // send signal to open signup dialog
   }
}

