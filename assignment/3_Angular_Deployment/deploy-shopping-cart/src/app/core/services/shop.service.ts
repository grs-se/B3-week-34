import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + environment.productsUrl);
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + environment.productsUrl);
  }
}
