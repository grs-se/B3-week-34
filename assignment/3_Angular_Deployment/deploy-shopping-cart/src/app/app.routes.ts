import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';
import { ShopComponent } from './features/shop/shop.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: 'shopping-cart',
    title: 'Shopping Cart',
    component: CartComponent,
  },
  { path: 'shop', title: 'Shop', component: ShopComponent },
  {
    path: 'orders',
    title: 'Orders',
    loadChildren: () =>
      import('./features/orders/routes').then((r) => r.orderRoutes),
  },
];
