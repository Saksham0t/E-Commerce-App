import { ComponentFixture, TestBed } from '@angular/core/testing';

import { admin } from './admin';

describe('admin', () => {
  let component: admin;
  let fixture: ComponentFixture<admin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [admin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
