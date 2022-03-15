import { ElementRef } from '@angular/core';
import { PositionService } from './position.service';
import { POSITION_SETTINGS } from './position.token';
import { PositionSettings } from './position.interface';

export const MENUABLE = {
  provide: PositionService,
  useFactory: (el: ElementRef, settings: PositionSettings) => new PositionService(el as ElementRef<HTMLElement>, settings),
  deps: [ElementRef, POSITION_SETTINGS],
};
