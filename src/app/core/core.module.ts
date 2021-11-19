import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreIndexComponent } from './components/core-index.component';
import { CoreRoutingModule } from './core-routing.module';
import { MainComponent } from './components/main/main.component';
import { ProductModule } from '../product/product.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, CoreRoutingModule, ProductModule],
  declarations: [CoreIndexComponent, MainComponent],
  exports: [MainComponent],
})
export class CoreModule {}
