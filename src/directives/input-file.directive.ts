import {Directive, Input, Output, EventEmitter, HostListener} from '@angular/core'

@Directive({
  selector: 'input[type=file]'
})
export class InputFileDirective {

  private cachedFile: File
  private _encoding: string

  @Output() result = new EventEmitter<string>()

  ngOnInit() {
    this.cachedFile = null
  }

  @HostListener('change', ['$event'])
  onChange(ev: Event) {
    const file = (<HTMLInputElement>ev.target).files[0]
    if (!file) {
      this.result.emit(null)
      return
    }
    this.cachedFile = file

    this.loadFile(this.cachedFile, this._encoding)
  }

  @Input()
  set encoding(v: string) {
    this._encoding = v

    if (!!this.cachedFile) {
      this.loadFile(this.cachedFile, this._encoding)
    }
  }

  loadFile(file: File, encoding: string) {
    const reader  = new FileReader()
    reader.onload = (ev: ProgressEvent) => {
      this.result.emit((<any>ev.target).result as string)
    }

    reader.readAsText(file, encoding)
  }

}
