import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {TranslateModule, TranslateService} from 'ng2-translate';

import {LOCALE} from './constant';
import {ROUTING} from './app.routing';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard.component';
import {DetailComponent} from './detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    ROUTING
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('ja');
    translate.use(LOCALE);
  }

}
