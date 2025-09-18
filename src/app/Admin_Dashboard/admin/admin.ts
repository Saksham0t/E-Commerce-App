import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,RouterOutlet, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class admin {
  router: any;
  logout() {
    // Remove login flag
    localStorage.removeItem('isAdminLoggedIn');

    // Redirect to admin login
    this.router.navigate(['/admin-login']);
  }
}
