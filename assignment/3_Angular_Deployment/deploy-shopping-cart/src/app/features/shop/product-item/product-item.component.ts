import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { HighlightDiscountDirective } from '../../../core/directives/highlight-discount.directive';
import { DiscountPipe } from '../../../core/pipes/discount.pipe';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, DiscountPipe, HighlightDiscountDirective],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() product?: Product;
  cartService = inject(CartService);
}
