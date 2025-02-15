import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]); // Para atualizar o carrinho em tempo real

  constructor() {}

  getCart() {
    return this.cartSubject.asObservable(); // Retorna o carrinho como um Observable
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.cartSubject.next([...this.cart]); // Atualiza o estado do carrinho
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.cartSubject.next([...this.cart]); // Atualiza o estado do carrinho
  }
}
