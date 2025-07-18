import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Cart | null>(null);
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  itemCount = computed(() => {
    return this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  totals = computed(() => {
    const cart = this.cart();

    if (!cart) return null;
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discountValue = subtotal * (0.9 / 100);

    return {
      subtotal,
      total: subtotal - discountValue,
      discount: discountValue,
      // total: subtotal + shipping - discountValue
    };
  });

  getCart(id: string): Observable<Cart | undefined> {
    return this.http.get<Cart[]>(this.baseUrl + environment.cartUrl).pipe(
      map((carts) => {
        const cart = carts.find((c) => String(c.id) === String(id));
        if (cart) {
          this.setCart(cart);
        }
        return cart;
      })
    );
  }

  setCart(cart: Cart) {
    this.cart.set(cart);
    localStorage.setItem('cart_id', cart.id);
  }

  addItemToCart(item: CartItem | Product, quantity = 1) {
    console.log('addItemToCart', item, quantity);
    const cart = this.cart() ?? this.createCart();
    if (this.isProduct(item)) {
      console.log('isProduct', item);
      item = this.mapProductToCartItem(item);
    }
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    console.log('cart.items', cart.items);
    this.setCart(cart);
  }

  removeItemFromCart(productId: number, quantity = 1) {
    const cart = this.cart();
    if (!cart) return;
    const index = cart.items.findIndex((x) => x.productId === productId);
    if (index !== -1) {
      if (cart.items[index].quantity > quantity) {
        cart.items[index].quantity -= quantity;
      } else {
        cart.items.splice(index, 1);
      }
      if (cart.items.length === 0) {
        this.deleteCart();
      } else {
        this.setCart(cart);
      }
    }
  }

  deleteCart() {
    this.cart.set(null);
    localStorage.removeItem('cart_id');
    // this.http.delete(this.baseUrl + 'cart?id=' + this.cart()?.id).subscribe({
    //   next: () => {
    //     localStorage.removeItem('cart_id');
    //     this.cart.set(null);
    //   },
    // });
  }

  private addOrUpdateItem(
    items: CartItem[],
    item: CartItem,
    quantity: number
  ): CartItem[] {
    const index = items.findIndex((x) => x.productId === item.productId);
    if (index === -1) {
      item.quantity = quantity;
      items.push(item);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  private mapProductToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.brand,
      type: item.type,
    };
  }

  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }
}
