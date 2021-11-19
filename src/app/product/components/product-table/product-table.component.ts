import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from './../../models/product';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  filteredProducts: any;
  categories$: Observable<any>;
  products$: any;
  Subscription: Subscription;
  areProductsLoading = true;
  products: any;
  isTableFilteredBefore = false;
  currentProdIndex: number = -1;
  searchQuery: string = '';
  currentCategory = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  columns = [
    {
      columnDef: 'id',
      header: '#',
      cell: (element: any) => `${element.id}`,
    },
    {
      columnDef: 'title',
      header: 'title',
      cell: (element: any) => `${element.title}`,
    },
    {
      columnDef: 'price',
      header: 'price',
      cell: (element: any) => `${element.price}`,
    },
    {
      columnDef: 'description',
      header: 'description',
      cell: (element: any) => `${element.description}`,
    },
    {
      columnDef: 'image',
      header: 'image',
      cell: (element: any) => `${element.image}`,
    },
  ];
  ELEMENT_DATA: any[] = [
    { id: 1, title: 'Hydrogen', description: '', price: 1.0079, image: 'H' },
    { id: 2, title: 'Helium', description: '', price: 4.0026, image: 'He' },
    { id: 3, title: 'Lithium', description: '', price: 6.941, image: 'Li' },
  ];
  currentEditedProd: any = null;

  displayedColumns = this.columns.map((c) => c.columnDef);
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private ProductService: ProductService,

    private router: Router
  ) {
    this.categories$ = ProductService.getAllCategories();

    this.Subscription = ProductService.getAllProducts().subscribe((res) => {
      this.filteredProducts = res;
      this.products = res;
      this.areProductsLoading = false;
      this.updateTable(this.products);
    });
  }
  ngOnInit() {}

  updateTable(products: any) {
    this.dataSource = new MatTableDataSource<any>(products);
    this.dataSource._updateChangeSubscription();
    this.dataSource._updatePaginator(products.length);
    this.paginator?.firstPage();
    this.dataSource.paginator = this.paginator;
  }
  filterProducts(category: string | null) {
    this.areProductsLoading = true;
    if (category == null || category == '') {
      this.ProductService.getAllProducts().subscribe((res) => {
        this.filteredProducts = res;
        this.areProductsLoading = false;
        this.updateTable(res);
      });
    } else {
      this.ProductService.filterProducts(category).subscribe((res) => {
        this.filteredProducts = res;
        this.areProductsLoading = false;
        this.updateTable(res);
      });
    }
  }
  deleteProduct(id: number) {
    this.ProductService.deleteProduct(id).subscribe((product: any) => {
      this.filteredProducts = this.filteredProducts.filter(
        (prod: Product) => prod.id != product.id
      );
      this.updateTable(this.filteredProducts);
    });
  }
  editProduct(prod: any) {
    this.router.navigate([`/product/${prod.id}`]);
  }
  addProduct() {
    this.router.navigate([`/product/add`], {
      queryParams: { isAddMode: true },
    });
  }
  OnDestroy() {
    this.Subscription.unsubscribe();
  }
}
