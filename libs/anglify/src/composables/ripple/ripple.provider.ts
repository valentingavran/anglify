import { ElementRef, Renderer2 } from '@angular/core';
import { RippleService } from './ripple.service';

export const RIPPLE = {
  provide: RippleService,
  useFactory: (elementRef: ElementRef<HTMLElement>, renderer: Renderer2) => new RippleService(elementRef, renderer),
  deps: [ElementRef, Renderer2],
};
