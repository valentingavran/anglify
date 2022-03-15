import { ElementRef } from '@angular/core';
import { ElevationService } from './elevation.service';

export const ELEVATION = {
  provide: ElevationService,
  useFactory: (el: ElementRef) => new ElevationService(el as ElementRef<HTMLElement>),
  deps: [ElementRef],
};
