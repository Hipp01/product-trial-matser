import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "app/products/data-access/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, product]);
  }

  removeFromCart(product: Product) {
    const currentCart = this.cart.value.filter(item => item.id !== product.id);
    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next([]);
  }
}
