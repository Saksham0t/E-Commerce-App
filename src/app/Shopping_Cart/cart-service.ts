import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import ProductsList from '../Admin_Dashboard/Interfaces/ProductsList';

@Injectable({ providedIn: 'root' })
export class CartService {

  // API endpoints
  private cartUrl = 'http://localhost:3000/cartItems';
  private productsUrl = 'http://localhost:3000/ProductsList';

  // Observable to keep track of total items in cart
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCartCount();
  }

  /** Get the latest cart count and update the observable */
  private updateCartCount(): void {
    this.http.get<any[]>(this.cartUrl).subscribe(items => {
      const totalQuantity = items.reduce((sum, item) => sum + Number(item?.Quantity || 0), 0);
      this.cartCountSubject.next(totalQuantity);
    });
  }

  /**
   * Add a product to the cart.
   * If it already exists, increase its quantity.
   */
  addToCart(product: ProductsList, quantity: number = 1): Observable<any> {
    const qtyToAdd = Number(quantity) || 1;

    // Check if product already exists in cart
    return this.http.get<any[]>(`${this.cartUrl}?Productid=${product.id}`).pipe(
      switchMap(existingItems => {
        if (existingItems.length > 0) {
          // Product exists → update quantity
          const existingItem = existingItems[0];
          const updatedQty = Number(existingItem.Quantity || 0) + qtyToAdd;
          const updatedTotal = Number(product.Price) * updatedQty;

          return this.updateCartItem(existingItem.id, {
            Quantity: updatedQty,
            TotalPrice: updatedTotal
          });
        } else {
          // Product not in cart → add new
          const totalPrice = Number(product.Price) * qtyToAdd;
          const newCartItem = {
            Productid: product.id,
            Quantity: qtyToAdd,
            TotalPrice: totalPrice
          };

          return this.http.post(this.cartUrl, newCartItem);
        }
      }),
      tap(() => this.updateCartCount())
    );
  }

  /**
   * Get all cart items with full product details merged in.
   */
  getCartItemsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      switchMap(cartItems =>
        this.http.get<ProductsList[]>(this.productsUrl).pipe(
          map(products =>
            cartItems.map(cartItem => {
              const product = products.find(p => p.id === cartItem.Productid);
              // Merge product details with cart item data
              return { ...(product || {}), ...cartItem };
            })
          )
        )
      )
    );
  }

  /**
   * Update a cart item by ID.
   */
  updateCartItem(id: number | string, changes: any): Observable<any> {
    return this.http.patch(`${this.cartUrl}/${id}`, changes).pipe(
      tap(() => this.updateCartCount())
    );
  }

  /**
   * Remove a cart item by ID.
   */
  removeFromCart(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`).pipe(
      tap(() => this.updateCartCount())
    );
  }
}
