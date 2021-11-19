import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs';
import { Product, sortCases } from './../../models/product';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss'],
})
export class ProductCardListComponent implements OnInit {
  categories$: Observable<any>;
  products$: any;
  products: any;
  filteredProducts: any;
  areProductsLoading = true;
  currentCategory: string | null = null;
  filteredProductsSnapShot: any;
  sortCases = sortCases;
  constructor(private ProductService: ProductService) {
    this.categories$ = ProductService.getAllCategories();
    this.products$ = ProductService.getAllProducts().subscribe((res) => {
      this.filteredProducts = res;
      this.filteredProductsSnapShot = [...this.filteredProducts];
      this.products = res;
      this.areProductsLoading = false;
    });
  }

  ngOnInit() {}
  filterProducts(category: string | null) {
    this.currentCategory = category;
    this.areProductsLoading = true;
    if (category == null) {
      this.ProductService.getAllProducts().subscribe((res) => {
        this.filteredProducts = res;
        this.filteredProductsSnapShot = [...this.filteredProducts];
        this.areProductsLoading = false;
      });
    } else {
      this.ProductService.filterProducts(category).subscribe((res) => {
        this.filteredProducts = res;
        this.filteredProductsSnapShot = [...this.filteredProducts];
        this.areProductsLoading = false;
      });
    }
  }
  filterWithSearch($event: any) {
    let searchQuery = $event.target.value;

    if (searchQuery == '') {
      this.filteredProducts = [...this.filteredProductsSnapShot];
    } else {
      this.filteredProducts = [
        ...this.filteredProductsSnapShot.filter((prod: Product) => {
          return (
            prod.title.includes(searchQuery) ||
            prod.description.includes(searchQuery) ||
            prod.price == searchQuery
          );
        }),
      ];
    }
    console.log(searchQuery, this.filteredProducts);
  }
  sortProducts($event: any) {
    let sortCase = $event.target.value;

    if (sortCase == sortCases.asc) {
      this.filteredProducts.sort(function (a: Product, b: Product) {
        return a.price - b.price;
      });
    } else {
      this.filteredProducts.sort(function (a: Product, b: Product) {
        return b.price - a.price;
      });
    }
  }
}
