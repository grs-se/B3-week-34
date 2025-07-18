import { inject, Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private cartService = inject(CartService);

  init() {
    localStorage.setItem('cart_id', '1'); // TODO for testing purposes only
    const cartId = localStorage.getItem('cart_id');
    // ? localStorage.getItem('cart_id')
    // : '1';
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null);

    return forkJoin({
      cart: cart$,
    });
  }
}
