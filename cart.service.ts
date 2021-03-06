import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { carturl } from '../config/api';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(carturl).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];

        for (let item of result) {

          let productexists = false
          for (let i in cartItems) {
            if (cartItems[i].productId === item.product.id) {
              cartItems[i].qty++;
              productexists = true;
              break;
            }
          }

          if (!productexists) {
            cartItems.push(new CartItem(item.id,item.product));
          }

        }
        return cartItems;
      })
    );
  }

  addProductsToCart(product: Product): Observable<any> {
    return this.http.post(carturl, { product });
  }

}
