import { Component, HostListener, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import ProductsList from '../../Admin_Dashboard/Interfaces/ProductsList';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rest1 } from '../../Admin_Dashboard/Interfaces/rest1';
import { CartService } from '../../Shopping_Cart/cart-service';

// Let TypeScript know Bootstrap's JS API exists
declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  providers: [Rest1, HttpClientModule],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  productsByCategory: { [key: string]: ProductsList[] } = {};
  products: ProductsList[] = [];
  addedToCart = new Set<string>();

  // Scroll to top button
  showScrollTopButton = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTopButton = scrollY > 300;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Carousel progress bar
  carouselItems = [
    '../../../assets/Womens.mp4',
    '../../../assets/NewSeason.mp4',
    '../../../assets/Sneakers.mp4',
    '../../../assets/Tech.mp4',
    '../../../assets/Makeup.mp4',
    '../../../assets/Mens.png',
    '../../../assets/Watch.mp4'
  ];

  activeIndex = 0;
  progress = 0;

  private rafId: number | null = null;
  private startTime = 0;
  private durationMs = 4000;

  // Default durations (ms) — overridden by data-bs-interval if present
  private durations: number[] = [6000, 4000, 4000, 4000, 4000, 4000, 4000];

  constructor(private productService: Rest1, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProductsfromService();
  }

  ngAfterViewInit(): void {
    const carouselEl = document.getElementById('carouselExample');
    if (!carouselEl) return;

    // Read per-slide data-bs-interval values
    this.syncDurationsFromDom();

    // Start progress for initial active slide
    this.startProgressFor(this.getActiveIndexFromDom());

    // Restart progress when a slide finishes changing
    carouselEl.addEventListener('slid.bs.carousel', (event: any) => {
      const newIndex = typeof event.to === 'number' ? event.to : this.getActiveIndexFromDom();
      this.startProgressFor(newIndex);
    });
  }

  ngOnDestroy(): void {
    this.stopProgress();
  }

  // Click a bar to navigate to that slide and start its progress
  goToSlide(index: number): void {
    const carouselEl = document.getElementById('carouselExample');
    if (!carouselEl || typeof bootstrap === 'undefined') return;

    const instance =
      bootstrap.Carousel.getInstance(carouselEl) || new bootstrap.Carousel(carouselEl);

    // Navigate to chosen slide
    instance.to(index);
    // Immediately start progress for that slide
    this.startProgressFor(index);
  }

  // ----- Progress animation -----
  private startProgressFor(index: number): void {
    this.stopProgress();
    this.activeIndex = index;
    this.durationMs = this.getDuration(index);
    this.progress = 0;
    this.startTime = performance.now();
    this.tick();
  }

  private tick = (): void => {
    const now = performance.now();
    const elapsed = now - this.startTime;
    const pct = Math.min(100, (elapsed / this.durationMs) * 100);

    this.progress = pct;

    if (pct >= 100) {
      this.stopProgress();
      return;
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  private stopProgress(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private getDuration(index: number): number {
    const domInterval = this.getDurationFromDom(index);
    return domInterval ?? this.durations[index] ?? 4000;
  }

  // ----- Helpers to sync with DOM -----
  private syncDurationsFromDom(): void {
    const carouselEl = document.getElementById('carouselExample');
    if (!carouselEl) return;

    const items = Array.from(carouselEl.querySelectorAll('.carousel-item'));
    this.durations = items.map((item, i) => {
      const attr = item.getAttribute('data-bs-interval');
      const parsed = attr ? parseInt(attr, 10) : NaN;
      if (!isNaN(parsed)) return parsed;
      return i === 0 ? 6000 : 4000;
    });
  }

  private getDurationFromDom(index: number): number | null {
    const carouselEl = document.getElementById('carouselExample');
    if (!carouselEl) return null;
    const items = carouselEl.querySelectorAll('.carousel-item');
    const item = items[index] as HTMLElement | undefined;
    if (!item) return null;
    const attr = item.getAttribute('data-bs-interval');
    if (!attr) return null;
    const parsed = parseInt(attr, 10);
    return isNaN(parsed) ? null : parsed;
  }

  private getActiveIndexFromDom(): number {
    const carouselEl = document.getElementById('carouselExample');
    if (!carouselEl) return this.activeIndex;
    const items = Array.from(carouselEl.querySelectorAll('.carousel-item'));
    const idx = items.findIndex(i => i.classList.contains('active'));
    return idx >= 0 ? idx : this.activeIndex;
  }

  // ----- Existing data/cart logic -----
  getProductsfromService() {
    this.productService.getData('/ProductsList').subscribe({
      next: (data) => {
        this.products = data;
        const categories = [
          'Electronics','Accessories', 'T-shirts', 'Footwear', 'Beauty', 'Watches',
          'Sports', 'Toys', 'Fashion Wear (Male)', 'Fashion Wear (Ladies)',
          'Books', 'Kitchen','Grocery'
        ];
        categories.forEach((cat) => {
          this.productsByCategory[cat] = this.getProductsByCategory(cat);
        });
      },
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting data from backend..'),
    });
  }

  getProductsByCategory(category: string): ProductsList[] {
    return this.products.filter((p) => p.Category === category);
  }

  addToCart(product: ProductsList): void {
    this.cartService.addToCart(product, 1).subscribe({
      next: () => {
        this.addedToCart.add(product.id);
      },
      error: (err) => console.error('Error adding to cart', err),
    });
  }
}
