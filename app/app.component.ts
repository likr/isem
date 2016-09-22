import {Component} from '@angular/core';

@Component({
  selector: 'is-app',
  template: `
    <style>
      .header {
        background-color: #455A64;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
        height: 64px;
        line-height: 64px;
        color: #FFFFFF;
      }
    </style>
    <div class="header">
      {{'ApplicationName' | translate}}
    </div>
  `
})
export class AppComponent {}
