import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-core-index',
  templateUrl: './core-index.component.html',
  styleUrls: ['./core-index.component.scss'],
})
export class CoreIndexComponent implements OnInit {
  currentUser: null | object;
  constructor(private auth: AuthService) {
    this.currentUser = null;
  }
  ngOnInit() {
    if (localStorage.getItem('currentUser') as string) {
      this.currentUser =
        JSON.parse(localStorage.getItem('currentUser') as string) ||
        this.auth.UserSubject.getValue();
    } else {
      this.currentUser = null;
    }
  }
}
