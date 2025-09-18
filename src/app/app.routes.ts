import { Routes, RouterModule } from '@angular/router';
import { Cart } from './Shopping_Cart/cart/cart';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Products } from './Admin_Dashboard/components/products/products';
import { Orders } from './Admin_Dashboard/components/orders/orders';
import { Customers } from './Admin_Dashboard/components/customers/customers';
import { Reports } from './Admin_Dashboard/components/reports/reports';
import { admin } from './Admin_Dashboard/admin/admin';
import { UserSignupComponent } from './User_Authentication/user-signup/user-signup';
import { LoginComponent } from './User_Authentication/user-login/user-login';
import { AdminLoginComponent } from './Admin_Dashboard/admin-login/admin-login';
import { AdminAuthGuard } from './Admin_Dashboard/admin-auth-guard';

NgModule({
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        RouterModule,
        FormGroup,
        ReactiveFormsModule
    ]
})

export const routes: Routes = [

    {path:'cart', component: Cart},
    {path:'users-signup', component: UserSignupComponent},
    {path:'user-login', component: LoginComponent},
    {path:'admin-login', component: AdminLoginComponent},
    {path:'admin', component:admin, canActivate: [AdminAuthGuard] },
    {path:'admin',component:admin,
        children:[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {path:'products',component:Products},
            {path:'orders',component:Orders},
            {path:'customers',component:Customers},
            {path:'reports',component:Reports}
        ]
    }

];



export class AppModule { }