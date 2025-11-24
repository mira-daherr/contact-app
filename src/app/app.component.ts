import { TranslocoService } from '@ngneat/transloco';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private translocoService: TranslocoService) {}
  
  setLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
