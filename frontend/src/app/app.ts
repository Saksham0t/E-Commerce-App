import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, Footer,RouterModule],   
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}