import { Component, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ProductListComponent, FooterComponent, CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  searchTerm: string = '';
  intervalId: any;

  onSearch(term: string) {
    this.searchTerm = term;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const slides = document.querySelector('.slides') as HTMLElement;
      if (!slides) return; // ✅ Evita erro se o elemento não for encontrado

      const images = slides.children.length;
      let index = 0;

      this.intervalId = setInterval(() => {
        if (!slides) return;
        index = (index + 1) % images;
        slides.style.transform = `translateX(${-index * 100}%)`;
      }, 3000); // ✅ Troca de imagem a cada 3 segundos com transição suave
    }, 500); // ✅ Garante que o DOM esteja carregado
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // ✅ Para o carrossel ao sair da página
  }
}
