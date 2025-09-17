// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { OrderConfirmation } from '../order-confirmation/order-confirmation';

// @Component({
//   selector: 'app-checkout',
//   imports: [CommonModule,ReactiveFormsModule],
//   templateUrl: './checkout.html',
//   styleUrl: './checkout.css'
// })
// export class Checkout implements OnInit {
//     checkoutForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private orderService: OrderService,
//     private router: Router
//   ) {
//     this.checkoutForm = this.fb.group({
//       shippingAddress: ['', Validators.required],
//       // Add other form controls for payment details, etc.
//     });
//   }

//   ngOnInit(): void {
//     // You might fetch cart details here to calculate the total price
//   }

//   onSubmit(): void {
//     if (this.checkoutForm.valid) {
//       // Create a new order object based on the form data and cart information
//       const newOrder: Partial<OrderConfirmation> = {
//         userID: 1, // Get this from the authenticated user
//         shippingAddress: this.checkoutForm.value.shippingAddress,
//         status: 'Pending',
//         totalPrice: 150.00 // Calculate this from the cart
//         // ...
//       };

//       this.orderService.createOrder(newOrder as OrderConfirmation).subscribe(
//         (order) => {
//           console.log('Order placed successfully!', order);
//           // Redirect to the order confirmation page with the new order ID
//           this.router.navigate(['/orders/confirmation', order.orderID]);
//         },
//         (error) => {
//           console.error('Error placing order:', error);
//           // Handle error, show message to user
//         }
//       );
//     }
//   }
// }
