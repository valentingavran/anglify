import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[anglifyClickStopPropagation]',
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    event.stopPropagation();
  }
}
