import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  products?: Product[];
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];

  ngOnInit() {
    this.initialiseShop();
  }

  initialiseShop() {
    this.getProducts();

    console.log(this.products, 'Products in initialiseShop');
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        console.log('Products fetched successfully:', response);
        this.products = response;
      },
      error: (error) => console.error(error),
    });
  }
}
