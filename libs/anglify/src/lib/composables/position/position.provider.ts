import { ElementRef } from '@angular/core';
import type { PositionSettings } from './position.interface';
import { PositionService } from './position.service';
import { POSITION_SETTINGS } from './position.token';
import { AnglifyDestroyService } from '../../services/destroy/destroy.service';

export const POSITION = {
  provide: PositionService,
  useFactory: (el: ElementRef<HTMLElement>, settings: PositionSettings, destroy$: AnglifyDestroyService) =>
    new PositionService(el, settings, destroy$),
  deps: [ElementRef, POSITION_SETTINGS],
};
