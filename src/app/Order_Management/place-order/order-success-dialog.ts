import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success-dialog',
  template: `
    <h2 mat-dialog-title>Order Placed Successfully 🎉</h2>
    <mat-dialog-content>
      <p>Your order <strong>{{ data.orderId }}</strong> has been placed successfully.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="goHome()">Back to Home</button>
      <button mat-button color="accent" (click)="viewOrderDetails()">View Order Details</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogContent, MatDialogActions]
})
export class OrderSuccessDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<OrderSuccessDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string }
  ) {}

  goHome() {
    this.dialogRef.close();
    this.router.navigate(['/home']);   // ✅ goes back to home
  }

  viewOrderDetails() {
    this.dialogRef.close();
    // ✅ placeholder for now
    console.log('View Order Details clicked for order:', this.data.orderId);
    this.router.navigate(['/order-details']); // dummy route, you’ll build later
  }
}
