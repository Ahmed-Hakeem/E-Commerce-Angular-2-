import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthIndexComponent } from './components/auth-index.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: AuthIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
