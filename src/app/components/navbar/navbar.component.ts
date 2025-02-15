import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>();
  cartItemCount: number = 0; // Contador do carrinho
  darkMode: boolean = false; // Estado do modo escuro

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Atualiza o contador do carrinho em tempo real
    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.search.emit(inputElement.value);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}



