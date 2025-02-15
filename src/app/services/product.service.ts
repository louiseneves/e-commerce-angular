import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Paracetamol', price: 10, image: 'https://picsum.photos/200', category: 'Analgésico',activeIngredient:'' },
    { id: 2, name: 'Tênis', price: 200, image: 'https://picsum.photos/150', category: 'Analgésico',activeIngredient:'' },
    { id: 3, name: 'Relógio', price: 300, image: 'https://picsum.photos/300', category: 'Antibiótico',activeIngredient:'' },
    { id: 4, name: 'Boné', price: 80, image: 'https://picsum.photos/400', category: 'Antibiótico',activeIngredient:'' }
  ];

  private filteredProductsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts(): Observable<Product[]> {
    return this.filteredProductsSubject.asObservable();
  }

  filterProducts(category: string, searchTerm: string): void {
    let filteredProducts = this.products.slice(); // Cria uma cópia da lista original

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    this.filteredProductsSubject.next(filteredProducts);
  }

  getProductById(id: number): Observable<Product | null> {
    const product = this.products.find(product => product.id === id);
    return of(product || null);
  }
}


  
  