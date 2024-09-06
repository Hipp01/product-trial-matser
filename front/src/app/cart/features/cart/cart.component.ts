import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CartService } from "app/cart/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule]
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Supprimer un produit du panier
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  // Vider tout le panier
  clearCart() {
    this.cartService.clearCart();
  }

  // Calculer le prix total des articles dans le panier
  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + product.price, 0);
  }
}
