import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../../Shopping_Cart/cart-service';

@Component({
  selector: 'app-order-success',
  standalone: true,
  templateUrl: './order-sucess.html',
  styleUrls: ['./order-sucess.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<OrderSuccessComponent>,
    private router: Router,
    private cartService: CartService, 
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string }
  ) {}

  ngOnInit(): void {
    // ✅ Clear the cart immediately when popup opens
    this.cartService.clearCart().subscribe({
      next: () => console.log('Cart cleared after order success'),
      error: (err) => console.error('Error clearing cart', err)
    });
  }

  goHome() {
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

  viewOrderDetails() {
    this.dialogRef.close();
    this.router.navigate(['/view-orders']);
  }
}
