import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() searchTerm: string = '';
  products: Product[] = [];

  get filteredProducts() {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getProducts()
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar produtos', error);
          return of([]); // Retorna uma lista vazia em caso de erro
        })
      )
      .subscribe(products => {
        this.products = products;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} foi adicionado ao carrinho!`);
  }

  trackById(index: number, product: Product) {
    return product.id; // Retorna o ID único do produto para otimizar a renderização do *ngFor
  }
}
