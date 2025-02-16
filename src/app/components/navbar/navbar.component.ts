import { Component, EventEmitter, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();
  private searchSubject = new Subject<string>();
  searchTerm: string = '';
  cartItemCount: number = 0;
  private subscriptions = new Subscription(); // ✅ Gerencia múltiplas assinaturas
  isCategoryOpen = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // ✅ Atualiza o contador do carrinho corretamente
    this.subscriptions.add(
      this.cartService.getCart().subscribe(cart => {
        this.cartItemCount = cart ? cart.length : 0;
      })
    );

    // ✅ Debounce para pesquisa, mas permitindo pesquisa imediata ao pressionar "Enter"
    this.subscriptions.add(
      this.searchSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
        if (searchTerm.trim()) {
          this.search.emit(searchTerm);
        }
      })
    );
  }

  // ✅ Atualiza a pesquisa com debounce enquanto o usuário digita
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim();
    this.searchSubject.next(this.searchTerm);
  }

  // ✅ Executa a pesquisa imediatamente ao pressionar "Enter"
  onEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchTerm.trim()) {
      this.performSearch();
    }
  }

  // ✅ Realiza a pesquisa quando o botão 🔎 for clicado
  performSearch() {
    if (!this.searchTerm.trim()) {
      alert('Por favor, insira um termo de pesquisa válido.');
      return;
    }
    this.search.emit(this.searchTerm);
  }

  // ✅ Fecha o menu de categorias ao clicar fora
  @HostListener('document:click', ['$event'])
  closeCategories(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.categories')) {
      this.isCategoryOpen = false;
    }
  }

  // ✅ Alternar o menu de categorias com acessibilidade
  toggleCategories(event: Event) {
    event.stopPropagation();
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  // ✅ Evita vazamentos de memória ao destruir o componente
  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // ✅ Agora todas as assinaturas são removidas corretamente
    this.searchSubject.complete();
  }
}


