import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { AuthService } from '../../User_Authentication/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../../User_Authentication/user-login/user-login';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalAmount = 0;
  grandTotal = 0;
  deliveryCharge = 0;
  discountAmount = 0;
  deliveryMessage = '';
  discountMessage = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItemsWithDetails().subscribe({
      next: (items) => {
        this.cartItems = items.map(item => ({
          ...item,
          Quantity: Number(item?.Quantity || 0),
          Price: Number(item?.Price || 0)
        }));
        this.updateSummary();
      },
      error: (err) => console.error('Error loading cart items:', err)
    });
  }

  updateSummary(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + (item.Price * item.Quantity),
      0
    );

    this.deliveryCharge = 0;
    this.discountAmount = 0;
    this.deliveryMessage = '';
    this.discountMessage = '';

    if (this.cartItems.length > 0) {
      if (this.totalAmount < 500) {
        this.deliveryCharge = 50;
        this.deliveryMessage = '🚚 Orders below ₹500 incur a ₹50 delivery charge.';
      } else {
        this.deliveryMessage = '🎉 Free delivery on your order!';
      }

      if (this.totalAmount >= 3000) {
        this.discountAmount = this.totalAmount * 0.15;
        this.discountMessage = '🔥 You unlocked 15% OFF for spending over ₹3000!';
      } else if (this.totalAmount >= 1000) {
        this.discountAmount = this.totalAmount * 0.10;
        this.discountMessage = '💰 You unlocked 10% OFF for spending over ₹1000!';
      } else {
        const needed = 1000 - this.totalAmount;
        this.discountMessage = `🛍 Spend ₹${needed} more to unlock 10% OFF!`;
      }
    }

    this.cartService.setDiscount(this.discountAmount);
    this.grandTotal = this.totalAmount + this.deliveryCharge - this.discountAmount;
    if (this.grandTotal < 0) this.grandTotal = 0;
  }

  increaseQuantity(item: any): void {
    const newQty = item.Quantity + 1;
    const newTotal = item.Price * newQty;

    this.cartService.updateCartItem(item.id, { Quantity: newQty, TotalPrice: newTotal })
      .subscribe(() => {
        item.Quantity = newQty;
        item.TotalPrice = newTotal;
        this.updateSummary();
      });
  }

  decreaseQuantity(item: any): void {
    if (item.Quantity <= 1) return;

    const newQty = item.Quantity - 1;
    const newTotal = item.Price * newQty;

    this.cartService.updateCartItem(item.id, { Quantity: newQty, TotalPrice: newTotal })
      .subscribe(() => {
        item.Quantity = newQty;
        item.TotalPrice = newTotal;
        this.updateSummary();
      });
  }

  removeItem(id: number | string): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
      this.updateSummary();
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToSummary(): void {
    if (!this.authService.isAuthenticated()) {
      // Open login popup instead of navigating
      this.dialog.open(UserLoginComponent, {
        width: '400px',
        panelClass: 'custom-dialog-container'
      });
      return;
    }
    this.router.navigate(['/summary']);
  }
}
