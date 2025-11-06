import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Rest1 } from '../../Interfaces/rest1';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  providers:[Rest1,HttpClientModule]
})
export class Reports {

}
