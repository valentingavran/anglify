import { ElementRef } from '@angular/core';
import type { PositionSettings } from './position.interface';
import { PositionService } from './position.service';
import { POSITION_SETTINGS } from './position.token';

export const POSITION = {
  provide: PositionService,
  useFactory: (el: ElementRef<HTMLElement>, settings: PositionSettings) => new PositionService(el, settings),
  deps: [ElementRef, POSITION_SETTINGS],
};
