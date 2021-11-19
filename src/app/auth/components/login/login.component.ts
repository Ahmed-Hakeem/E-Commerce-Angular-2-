import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { languages } from 'src/app/shared/models/languages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  notAuthenticated: boolean = true;
  submitted: boolean = false;
  userSubscription: any;
  currentLang: any;
  languages = languages;
  constructor(
    private auth: AuthService,
    private translateService: TranslateService
  ) {
    this.loginForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
    this.userSubscription = this.auth.userObs$.subscribe((val) => {
      if (val == null) {
        this.notAuthenticated = true;
      } else {
        this.notAuthenticated = false;
      }
    });
    this.currentLang = localStorage.getItem('lang');

    translateService.use(this.currentLang);
  }
  toggleLang(lang: any) {
    this.currentLang = lang;
    localStorage.setItem('lang', this.currentLang);
    this.translateService.use(lang).toPromise();
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.auth.login(this.getFormValue());
    }
  }
  getFormValue() {
    return this.loginForm.value;
  }

  ngOnDestroy() {
    {
      this.userSubscription.unsubscribe();
    }
  }
}
