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
    {path:'seller-auth', component: SellerAuth}

];



export class AppModule {}