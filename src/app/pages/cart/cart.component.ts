import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Se inscreva para obter os itens do carrinho
    this.cartService.getCart().subscribe(items => {
      this.cart = items; // Atualiza a lista de itens
    });
  }

  trackById(index: number, item: Product) {
    return item.id;
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id); // Agora remove do serviço e mantém a atualização em tempo real
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }
}
