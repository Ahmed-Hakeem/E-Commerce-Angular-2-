import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer id="footer" class="col-12">
    <img src="../assets/images/Vodafone-logo.svg.png" class="mx-auto d-block" />
  </footer>`,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor() {}
}
