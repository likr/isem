import {Directive, Input, Output, EventEmitter, HostListener} from '@angular/core'

@Directive({
  selector: 'input[type=file]'
})
export class InputFileDirective {

  @Input() encoding: string
  @Output() result = new EventEmitter<string>()

  @HostListener('change', ['$event'])
  onChange(ev: Event) {
    const file = (<HTMLInputElement>ev.target).files[0]
    if (!file) {
      this.result.emit(null)
      return
    }

    const fileReader  = new FileReader()
    fileReader.onload = (fileEvent: ProgressEvent) => {
      const result = (<any>fileEvent.target).result as string
      this.result.emit(result)
    }

    fileReader.readAsText(file, this.encoding)
  }

}
