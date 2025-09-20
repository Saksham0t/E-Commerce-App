import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {

  // Data for the cart
  cartItems: any[] = [];

  // Summary values
  totalAmount = 0;       // Subtotal of all items
  grandTotal = 0;        // Final total after delivery & discount
  deliveryCharge = 0;    // Delivery fee (if any)
  discountAmount=0;// Discount amount (if any)

  // Messages for the UI
  deliveryMessage = '';
  discountMessage = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.loadCartItems();
  } 

  /** Load cart items from the service */
  loadCartItems(): void {
    this.cartService.getCartItemsWithDetails().subscribe({
      next: (items) => {
        // Ensure numeric values for Quantity and Price
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

  /** Calculate totals, delivery charges, and discounts */
  updateSummary(): void {
    // Calculate subtotal
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + (item.Price * item.Quantity),
      0
    );
    // this.cartItems.reduce(
    //   (sum, item) => sum + (item.Price * item.Quantity),
    //   0
    // );

    // Reset values
    this.deliveryCharge = 0;
    this.discountAmount = 0;
    this.deliveryMessage = '';
    this.discountMessage = '';

    if (this.cartItems.length > 0) {
      // Delivery logic
      if (this.totalAmount < 500) {
        this.deliveryCharge = 50;
        this.deliveryMessage = '🚚 Orders below ₹500 incur a ₹50 delivery charge.';
      } else {
        this.deliveryMessage = '🎉 Free delivery on your order!';
      }

      // Discount logic
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

    // Final total
    this.grandTotal = this.totalAmount + this.deliveryCharge - this.discountAmount;
    if (this.grandTotal < 0) this.grandTotal = 0;
  }

  /** Increase quantity of an item */
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

  /** Decrease quantity of an item */
  decreaseQuantity(item: any): void {
    if (item.Quantity <= 1) return; // Prevent going below 1

    const newQty = item.Quantity - 1;
    const newTotal = item.Price * newQty;

    this.cartService.updateCartItem(item.id, { Quantity: newQty, TotalPrice: newTotal })
      .subscribe(() => {
        item.Quantity = newQty;
        item.TotalPrice = newTotal;
        this.updateSummary();
      });
  }

  /** Remove an item from the cart */
  removeItem(id: number | string): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
      this.updateSummary();
    });
  }

  /** Navigate to the home page */
  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToSummary(): void {
    this.router.navigate(['/summary']);
  }
}