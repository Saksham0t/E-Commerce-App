import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rest1 } from '../../Interfaces/rest1';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers:[Rest1,HttpClientModule]
})
export class Dashboard {

}
