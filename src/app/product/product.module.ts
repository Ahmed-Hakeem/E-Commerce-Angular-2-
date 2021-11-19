import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCardListComponent } from './components/product-card-list/product-card-list.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule, HttpLoaderFactory } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ProductCardComponent,
    ProductCardListComponent,
    ProductTableComponent,
    ProductModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatTableModule,

    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ProductModule {}
