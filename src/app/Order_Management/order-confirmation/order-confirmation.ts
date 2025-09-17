// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-order-confirmation',
//   imports: [CommonModule],
//   templateUrl: './order-confirmation.html',
//   styleUrl: './order-confirmation.css'
// })
// export class OrderConfirmation implements OnInit {
//   order: OrderConfirmation | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private orderService: OrderService
//   ) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const orderId = params.get('id');
//       if (orderId) {
//         this.orderService.getOrder(+orderId).subscribe(order => {
//           this.order = order;
//         });
//       }
//     });
//   }
// }

