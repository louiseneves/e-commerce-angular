import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ProductListComponent, FooterComponent, CommonModule, RouterLink,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  loading: boolean = true; // Estado de carregamento

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Simular carregamento de produtos
    this.productService.getProducts().subscribe(products => {
      // Aqui você pode definir seus produtos
      this.loading = false; // Define como não carregando após os produtos serem buscados
    });
  }
  onSearch(term: string) {
    this.searchTerm = term;
  }
}
