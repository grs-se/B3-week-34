import { Component, inject, input } from '@angular/core';
import { DiscountPipe } from '../../../core/pipes/discount.pipe';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../shared/models/cart';

@Component({
  selector: 'app-cart-item',
  imports: [DiscountPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);

  constructor() {
    console.log(this.cartService.cart(), 'cartService.cart()');
  }

  incrementQuantity() {
    this.cartService.addItemToCart(this.item());
  }

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(
      this.item().productId,
      this.item().quantity
    );
  }
}
