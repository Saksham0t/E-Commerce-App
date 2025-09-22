import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,RouterOutlet, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class admin {
  constructor(private router:Router){}
  logout() {
    // Remove login flag
    localStorage.removeItem('isAdminLoggedIn');

    // Redirect to admin login
    this.router.navigate(['/home']);
  }
  currentScreen = 1;

  navigateTo(route: string) {
    this.currentScreen = 2;
    this.router.navigate(["/admin"+route]);
  }

  goBack() {
    this.currentScreen = 1;
    this.router.navigate(['/admin']);
  }
  cards = [
  { title: 'Browse Products', route: '/products', image: 'https://plus.unsplash.com/premium_photo-1683887064106-531532ecdf20?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { title: 'Manage Orders', route: '/orders', image: 'https://plus.unsplash.com/premium_photo-1661342486992-2a08d4b466ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { title: 'Customers Details', route: '/customers', image: 'https://images.unsplash.com/photo-1556740720-776b84291f8e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
];

}
