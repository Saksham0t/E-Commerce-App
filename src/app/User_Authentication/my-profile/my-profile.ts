import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  orders: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // ✅ Fetch user details
      this.http.get<any>(`http://localhost:3000/users/${userId}`).subscribe(user => {
        this.user = user;
      });

      // ✅ Fetch orders belonging to this user
      this.http.get<any[]>(`http://localhost:3000/OrdersList?userId=${userId}`).subscribe(data => {
        this.orders = data;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}
