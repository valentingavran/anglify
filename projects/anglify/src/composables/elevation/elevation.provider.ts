import { ElementRef } from '@angular/core';
import { ElevationService } from './elevation.service';

export const ELEVATION = {
  provide: ElevationService,
  useFactory: (el: ElementRef<HTMLElement>) => new ElevationService(el),
  deps: [ElementRef],
};
