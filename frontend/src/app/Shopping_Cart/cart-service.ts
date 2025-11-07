import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, map, switchMap, tap } from 'rxjs';
import ProductsList from '../Admin_Dashboard/Interfaces/ProductsList';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartUrl = 'http://localhost:9090/api/v0/cart';
  private productsUrl = 'http://localhost:9090/api/v0/products';

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private discountAmount = 0;
  private totalAmountSubject = new BehaviorSubject<number>(0);
  totalAmount$ = this.totalAmountSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Call this after login to initialize cart state */
  initCartState(): void {
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
  private updateTotalAmount(): void {
    this.http.get<any[]>(this.cartUrl).subscribe(items => {
      const total = items.reduce(
        (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
        0
      );
      this.totalAmountSubject.next(total);
    });
  }

  getTotalAmount(): number {
    return this.totalAmountSubject.value;
  }

  // --- Cart count ---
  private updateCartCount(): void {
    this.http.get<any[]>(this.cartUrl).subscribe(items => {
      const totalQuantity = items.reduce((sum, item) => sum + (+item.quantity || 0), 0);
      this.cartCountSubject.next(totalQuantity);
    });
  }

  // --- Add to cart ---
  addToCart(product: ProductsList, quantity: number = 1): Observable<any> {
    const qtyToAdd = quantity > 0 ? quantity : 1;

    return this.http.get<any[]>(`${this.cartUrl}?productid=${product.id}`).pipe(
      switchMap((existingItems = []) => {
        if (existingItems && existingItems.length > 0) {
          const existingItem = existingItems[0];
          const updatedQty = (+existingItem.quantity || 0) + qtyToAdd;
          const updatedTotal = +product.price * updatedQty;

          return this.updateCartItem(existingItem.id, {
            quantity: updatedQty,
            totalPrice: updatedTotal
          });
        } else {
          const totalPrice = product.price * qtyToAdd;
          const newCartItem = {
            productid: product.id,
            quantity: qtyToAdd,
            price: +product.price,
            totalPrice: totalPrice
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
              const product = products.find(p => p.id === cartItem.productid);
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
