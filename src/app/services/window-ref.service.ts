import {Injectable} from '@angular/core'

@Injectable()
export class WindowRefService {
  get nativeWindow(): Window {
    return window
  }
}
