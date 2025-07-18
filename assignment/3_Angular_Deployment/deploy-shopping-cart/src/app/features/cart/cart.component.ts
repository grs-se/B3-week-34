import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private router = inject(Router);
  cartService = inject(CartService);

  constructor() {
    console.log(this.cartService.cart(), 'cartService.cart()');
  }
}
