import { Routes } from '@angular/router';
import { AdminAuthGuard } from './Admin_Dashboard/admin-auth-guard';
import { authGuard } from './User_Authentication/services/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./Product_Management/home/home').then(m => m.Home),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Shopping_Cart/cart/cart').then(m => m.Cart),
  },
  // {
  //   path: 'user-signup',
  //   loadComponent: () =>
  //     import('./User_Authentication/user-signup/user-signup').then(m => m.UserSignupComponent),
  // },
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./Admin_Dashboard/admin-login/admin-login').then(m => m.AdminLoginComponent),
  },
  {
    path: 'admin',
    // canActivate: [AdminAuthGuard],
    loadComponent: () =>
      import('./Admin_Dashboard/admin/admin').then(m => m.admin),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./Admin_Dashboard/components/products/products').then(m => m.Products),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./Admin_Dashboard/components/orders/orders').then(m => m.Orders),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./Admin_Dashboard/components/customers/customers').then(m => m.Customers),
      },
    ],
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./Order_Management/place-order/place-order').then(m => m.PlaceOrder),
  },
  {
    path: 'my-profile',
    loadComponent: () =>
      import('./User_Authentication/my-profile/my-profile').then(m => m.MyProfileComponent),
  },
  {
    path: 'view-orders',
    loadComponent: () =>
      import('./Order_Management/view-orders/view-orders').then(m => m.ViewOrders),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./Product_Management/search/search').then(m => m.Search),
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '**',
    loadComponent: () =>
      import('./Product_Management/home/home').then(m => m.Home),
  },
];
