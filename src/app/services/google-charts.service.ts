import { Injectable } from '@angular/core';

declare const google: any

@Injectable()
export class GoogleChartsService {
  api: any

  constructor() {
    google.charts.load("current", {packages:["corechart"]})
    this.api = new Promise((resolve) => {
      google.charts.setOnLoadCallback(() => {
        resolve(google)
      })
    })
  }

  load() {
    return this.api
  }
}
