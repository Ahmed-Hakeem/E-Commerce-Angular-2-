import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  starList: string[] = [];
  productModalShowed = false;
  constructor() {
    this.product = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };
  }
  ngOnInit(): void {
    let i = 1;
    for (i = 1; i <= 5; i++) {
      if (i <= this.product.rating.rate) {
        this.starList.push('fas fa-star');
      } else if (i <= this.product.rating.rate + 0.5) {
        this.starList.push('fas fa-star-half');
      } else {
        this.starList.push('far fa-star');
      }
    }
  }
  showProductModal() {
    this.productModalShowed = true;
  }
}
