import { Injectable } from '@angular/core';
import { environment } from './../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newProduct, Product } from './../models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<object> {
    return this.http.get(`${environment.API_URL}products`);
  }
  getAllCategories(): Observable<object> {
    return this.http.get(`${environment.API_URL}products/categories`);
  }
  filterProducts(category: any) {
    return this.http.get(`${environment.API_URL}products/category/${category}`);
  }
  getProduct(id: number): Observable<object> {
    return this.http.get(`${environment.API_URL}products/${id}`);
  }
  updateProduct(id: number, newProduct: any) {
    return this.http.patch(`${environment.API_URL}products/${id}`, newProduct);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${environment.API_URL}products/${id}`);
  }
  addProduct(newProduct: newProduct) {
    return this.http.post(`${environment.API_URL}products`, newProduct);
  }
}
