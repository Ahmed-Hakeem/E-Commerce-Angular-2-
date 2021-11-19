import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/Role';
import { NullableUser } from 'src/app/shared/models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: any, state: RouterStateSnapshot) {
    const currentUser: NullableUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    ) as NullableUser;

    if (currentUser) {
      // check if route is restricted by role
      if (
        route.data.roles &&
        route.data.roles.indexOf(currentUser.Role) === -1
      ) {
        // role not authorised so redirect to login
        currentUser.Role == Role.Admin &&
          this.router.navigate(['/productTable']);
        currentUser.Role == Role.User && this.router.navigate(['/productList']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
