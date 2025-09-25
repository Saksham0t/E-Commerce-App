import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-admin',
  imports: [RouterModule,RouterOutlet, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class admin {
  constructor(private router:Router){}

  ngOnInit() {
  const currentPath = this.router.url;

  if (currentPath === '/admin') {
    this.currentScreen = 1;
  } else {
    this.currentScreen = 2;
  }
}

    @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.goBack(); // Your custom logic
  }
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
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/admin']);
      })
    }
    cards = [
    { title: 'Browse Products', route: '/products', image: 'https://plus.unsplash.com/premium_photo-1683887064106-531532ecdf20?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Manage Orders', route: '/orders', image: 'https://plus.unsplash.com/premium_photo-1661342486992-2a08d4b466ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Customers Details', route: '/customers', image: 'https://images.unsplash.com/photo-1556740720-776b84291f8e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];
  
    summaryCards = [
      { title: 'Total Products', value: 128, trend: '+5 added this week' },
      { title: 'Orders This Month', value: 342, trend: '+12% growth' },
      { title: 'Active Customers', value: 89, trend: '+3 new today' },
      { title: 'Revenue', value: '₹1,23,400', trend: '+8.5% this month' }
    ];
  
    // Chart instances
    salesTrendChart: any;
    categoryChart: any;
  
    ngAfterViewInit(): void {
      this.renderSalesTrendChart();
      this.renderCategoryChart();
    }
  
    // 📈 Sales Trend Chart
    renderSalesTrendChart() {
      const ctx = document.getElementById('salesTrendChart') as HTMLCanvasElement;
      this.salesTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Monthly Revenue (₹)',
            data: [45000, 52000, 61000, 58000, 67000, 73000],
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13,110,253,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  
    // 📊 Category Performance Chart
    renderCategoryChart() {
      const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
      this.categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Electronics', 'Fashion', 'Home', 'Books'],
          datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#0d6efd', '#6610f2', '#198754', '#ffc107']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

}
