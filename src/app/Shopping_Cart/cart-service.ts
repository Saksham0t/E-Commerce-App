import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, map, switchMap, tap } from 'rxjs';
import ProductsList from '../Admin_Dashboard/Interfaces/ProductsList';

@Injectable({ providedIn: 'root' })
export class CartService {
  // API endpoints
  private cartUrl = 'http://localhost:3000/cartItems';
  private productsUrl = 'http://localhost:3000/ProductsList';

  // Observable to keep track of total items in cart
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  // Track discount and total amount
  private discountAmount = 0;
  private totalAmountSubject = new BehaviorSubject<number>(0);
  totalAmount$ = this.totalAmountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCartCount();
    this.updateTotalAmount();
  }

  // --- Discount helpers ---
  setDiscount(amount: number): void {
    this.discountAmount = amount;
  }

  getDiscount(): number {
    return this.discountAmount;
  }

  // --- Total amount helpers ---
  /** Update the total amount based on current cart items */
  private updateTotalAmount(): void {
    this.http.get<any[]>(this.cartUrl).subscribe(items => {
      const total = items.reduce(
        (sum, item) => sum + (Number(item?.Price) || 0) * (Number(item?.Quantity) || 0),
        0
      );
      this.totalAmountSubject.next(total);
    });
  }

  /** Get the latest total amount as a number */
  getTotalAmount(): number {
    return this.totalAmountSubject.value;
  }

  // --- Cart count ---
  private updateCartCount(): void {
    this.http.get<any[]>(this.cartUrl).subscribe(items => {
      const totalQuantity = items.reduce((sum, item) => sum + (+item.Quantity || 0), 0);
      this.cartCountSubject.next(totalQuantity);
    });
  }

  // --- Add to cart ---
  addToCart(product: ProductsList, quantity: number = 1): Observable<any> {
    const qtyToAdd = quantity > 0 ? quantity : 1;

    return this.http.get<any[]>(`${this.cartUrl}?Productid=${product.id}`).pipe(
      switchMap(existingItems => {
        if (existingItems.length > 0) {
          // Already in cart → update quantity
          const existingItem = existingItems[0];
          const updatedQty = (+existingItem.Quantity || 0) + qtyToAdd;
          const updatedTotal = +product.Price * updatedQty;

          return this.updateCartItem(existingItem.id, {
            Quantity: updatedQty,
            TotalPrice: updatedTotal
          });
        } else {
          // Not in cart → add new
          const totalPrice = +product.Price * qtyToAdd;
          const newCartItem = {
            Productid: product.id,
            Quantity: qtyToAdd,
            Price: +product.Price,
            TotalPrice: totalPrice
          };
          return this.http.post(this.cartUrl, newCartItem);
        }
      }),
      tap(() => {
        this.updateCartCount();
        this.updateTotalAmount();
      })
    );
  }

  // --- Get cart items with product details ---
  getCartItemsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      switchMap(cartItems =>
        this.http.get<ProductsList[]>(this.productsUrl).pipe(
          map(products =>
            cartItems.map(cartItem => {
              const product = products.find(p => p.id === cartItem.Productid);
              return { ...(product || {}), ...cartItem };
            })
          ),
          tap(() => this.updateTotalAmount())
        )
      )
    );
  }

  // --- Update item ---
  updateCartItem(id: number | string, changes: any): Observable<any> {
    return this.http.patch(`${this.cartUrl}/${id}`, changes).pipe(
      tap(() => {
        this.updateCartCount();
        this.updateTotalAmount();
      })
    );
  }

  // --- Remove item ---
  removeFromCart(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`).pipe(
      tap(() => {
        this.updateCartCount();
        this.updateTotalAmount();
      })
    );
  }

  // --- Clear cart ---
  clearCart(): Observable<void> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      switchMap(items => {
        if (items.length === 0) return of(void 0);

        const deleteRequests = items.map(item =>
          this.http.delete<void>(`${this.cartUrl}/${item.id}`)
        );

        return forkJoin(deleteRequests).pipe(
          tap(() => {
            this.updateCartCount();
            this.updateTotalAmount();
          }),
          map(() => void 0)
        );
      })
    );
  }
}
