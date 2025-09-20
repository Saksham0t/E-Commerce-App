import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSucess } from './order-sucess';

describe('OrderSucess', () => {
  let component: OrderSucess;
  let fixture: ComponentFixture<OrderSucess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSucess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSucess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
