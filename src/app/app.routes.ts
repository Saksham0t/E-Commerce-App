import { Routes } from '@angular/router';
import { Cart } from './Shopping_Cart/cart/cart';
import { UserAuth } from './User_Authentication/user-auth/user-auth';
import { SellerAuth } from './User_Authentication/seller-auth/seller-auth';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard } from './User_Authentication/dashboard/dashboard';
import { Products } from './Admin_Dashboard/components/products/products';
import { Orders } from './Admin_Dashboard/components/orders/orders';
import { Customers } from './Admin_Dashboard/components/customers/customers';
import { Reports } from './Admin_Dashboard/components/reports/reports';
import { admin } from './Admin_Dashboard/admin/admin';

NgModule({
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})

export const routes: Routes = [

    {path:'cart', component: Cart},
    {path:'user-auth', component: UserAuth},
    {path:'seller-auth', component: SellerAuth},
    {path:'admin',component:admin,
        children:[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {path:'dashboard',component:Dashboard},
            {path:'products',component:Products},
            {path:'orders',component:Orders},
            {path:'customers',component:Customers},
            {path:'reports',component:Reports}
        ]
    }

];



export class AppModule {}