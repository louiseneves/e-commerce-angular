import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  showMessage = false; // Para exibir a mensagem de sucesso

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.productService.getProductById(id).subscribe(product => {
          this.product = product;
        });
      } else {
        this.product = null; // Garante que o produto seja `null` se o ID for inválido
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 2000);
    }
  }
}

