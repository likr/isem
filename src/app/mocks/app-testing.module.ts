import {NgModule} from '@angular/core'

import {AppModule} from '../app.module'
import {MockTranslatePipe} from './pipes/mock-translate.pipe'

@NgModule({
  exports: [
    AppModule
  ],
  declarations: [
    MockTranslatePipe
  ],
  providers: [],
})
export class AppTestingModule { }
