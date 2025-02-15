import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  categories = ['Roupas', 'Calçados', 'Acessórios'];

  @Output() search = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
  }

  onCategoryChange(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.categoryChange.emit(category);
  }
}
