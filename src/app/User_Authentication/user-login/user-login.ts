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

  onLogin(): void {
    this.userService.getUsers().subscribe(users => {
      const foundUser = users.find(
        u => u.Email === this.email && u.Password === this.password
      );

      if (foundUser && foundUser.id) {
        this.authService.login(foundUser.id.toString(), foundUser.Name);
        this.dialogRef.close();
        this.router.navigate(['/home']);
      } else {
        this.loginError = true;
      }
    });
  }

  goToSignup(): void {
    this.dialogRef.close('open-signup'); // signal Header to open signup popup
  }

  goToAdminLogin(): void {
    this.dialogRef.close();
    this.router.navigate(['/admin-login']);
  }
}
