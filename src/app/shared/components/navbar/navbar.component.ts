import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { languages } from '../../models/languages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  languages = languages;
  currentLang: any;

  constructor(
    private auth: AuthService,
    private translateService: TranslateService
  ) {
    translateService.addLangs(['en', 'ar']);
    this.currentLang = localStorage.getItem('lang');
    translateService.use(this.currentLang);
  }
  toggleLang($event: any) {
    this.currentLang = $event.target.value;
    this.translateService.use(this.currentLang).toPromise();
    localStorage.setItem('lang', this.currentLang);
  }

  ngOnInit(): void {}
  logout() {
    this.auth.logout();
  }
}
