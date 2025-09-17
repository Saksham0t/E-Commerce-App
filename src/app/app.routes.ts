import { Routes, RouterModule } from '@angular/router';
import { Cart } from './Shopping_Cart/cart/cart';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserSignupComponent } from './User_Authentication/user-signup/user-signup';
import { LoginComponent } from './User_Authentication/user-login/user-login';

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

    { path: 'cart', component: Cart },
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: LoginComponent },
];



export class AppModule { }