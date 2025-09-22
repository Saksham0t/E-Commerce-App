import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  templateUrl: './order-sucess.html',
  styleUrls: ['./order-sucess.css']
})
export class OrderSuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<OrderSuccessComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string }
  ) {}

  goHome() {
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

  viewOrderDetails() {
    this.dialogRef.close();
    this.router.navigate(['/view-orders']);
  }
}
