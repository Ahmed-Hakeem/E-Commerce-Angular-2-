import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  { path: 'login', pathMatch: 'prefix', loadChildren: () => AuthModule },
  { path: '', pathMatch: 'prefix', loadChildren: () => CoreModule },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
