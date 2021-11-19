import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from '../auth/services/auth-gaurd.service';
import { ProductCardListComponent } from '../product/components/product-card-list/product-card-list.component';
import { Role } from '../shared/models/Role';
import { MainComponent } from './components/main/main.component';
import { ProductTableComponent } from '../product/components/product-table/product-table.component';
import { CoreIndexComponent } from './components/core-index.component';
import { ProductModalComponent } from '../product/components/product-modal/product-modal.component';

const routes: Routes = [
  {
    path: '',

    component: CoreIndexComponent,

    children: [
      {
        path: 'productList',
        pathMatch: 'prefix',
        component: ProductCardListComponent,
        canActivate: [AuthGaurdService],
        data: { roles: [Role.User] },
      },
    ],
  },
  {
    path: '',

    component: CoreIndexComponent,

    children: [
      {
        path: 'productTable',
        pathMatch: 'prefix',
        component: ProductTableComponent,
        canActivate: [AuthGaurdService],
        data: { roles: [Role.Admin] },
      },
    ],
  },
  {
    path: '',

    component: CoreIndexComponent,

    children: [
      {
        path: 'product/add',
        pathMatch: 'prefix',
        component: ProductModalComponent,
        canActivate: [AuthGaurdService],
        data: { roles: [Role.Admin] },
      },
    ],
  },
  {
    path: '',

    component: CoreIndexComponent,

    children: [
      {
        path: 'product/:id',
        pathMatch: 'prefix',
        component: ProductModalComponent,
        canActivate: [AuthGaurdService],
        data: { roles: [Role.Admin] },
      },
    ],
  },
  {
    path: '',
    pathMatch: 'prefix',
    component: CoreIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
