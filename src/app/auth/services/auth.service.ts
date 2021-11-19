import { unAuthorizedUser, NullableUser } from 'src/app/shared/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/Role';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<NullableUser>;
  public userObs$: Observable<NullableUser>;

  currentUser: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    //initialize current user with localstorage value if existed
    this.currentUserSubject = new BehaviorSubject<NullableUser>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.userObs$ = this.currentUserSubject as Observable<NullableUser>;
  }
  get UserSubject() {
    return this.currentUserSubject;
  }

  authorize(user: unAuthorizedUser): Observable<NullableUser> {
    let userObj = null;
    if (user.Username == 'admin') {
      if (user.Password == 'admin') {
        userObj = { ...user, Role: Role.Admin };
      } else {
        userObj = null;
      }
    } else if (user.Username == 'user') {
      if (user.Password == 'user') {
        userObj = { ...user, Role: Role.User };
      } else {
        userObj = null;
      }
    } else {
      userObj = null;
    }
    return of(userObj);
  }

  login(user: unAuthorizedUser) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl as string);
    //mimic server authorization
    this.authorize(user).subscribe((currentUser) => {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
      this.currentUser = currentUser;
      if (currentUser != null && !returnUrl) {
        currentUser.Role == Role.Admin &&
          this.router.navigate(['/productTable']);
        currentUser.Role == Role.User && this.router.navigate(['/productList']);
      } else {
        this.router.navigate([`${returnUrl}`]);
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
