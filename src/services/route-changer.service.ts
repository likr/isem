import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

@Injectable()
export class RouteChanger {

  constructor(private router: Router) {}

  toDetail(uuid: string) {
    this.router.navigate([`project`, uuid]);
  }

}
